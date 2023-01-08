using API.DTO_s;
using API.Errors;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace API.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;
        private readonly IAuthService _authService;

        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            IMailService mailService,
            IAuthService authService
          )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _mailService = mailService;
            _authService = authService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurentUser()
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(User);
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = await _tokenService.CreateToken(user),
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddressAsync(User);

            return _mapper.Map<Address, AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddressAsync(User);

            user.Address = _mapper.Map<AddressDto, Address>(address);

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
                return Ok(_mapper.Map<Address, AddressDto>(user.Address));

            return BadRequest("Problem updating the user!");

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
                return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
                return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = await _tokenService.CreateToken(user)
            };
        }

        [HttpPost("loginWithGoogle")]
        public async Task<ActionResult> LoginWithGoogle([FromBody] string credential)
        {

            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {                                   // write your google client_id
                Audience = new List<string> { "12345678890-kt1f1gm4mnr269uitasa37afa1q2ue7.apps.googleusercontent.com" }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(credential, settings);
            var user = await _userManager.FindByEmailAsync(payload.Email);
            if (user != null)
            {
                return Ok(
                    new UserDto
                    {
                        Email = user.Email,
                        DisplayName = user.DisplayName,
                        Token = await _tokenService.CreateToken(user)
                    });
            }
            else
            {
                return Unauthorized(new ApiResponse(401));
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse
                {
                    Errors = new[] { "Email Address is in use " }
                });
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
                return BadRequest(new ApiResponse(400));

            var roleAddResult = await _userManager.AddToRoleAsync(user, "User");

            if (!roleAddResult.Succeeded) return BadRequest("Failed ot add to role");

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
            };
        }



        [HttpPost("ForgotPassword")]
        public async Task<ActionResult> ForgotPasword(PasswordForgotDto resetDto)
        {
            if (ModelState.IsValid)
            {
                AppUser user = await _userManager.FindByEmailAsync(resetDto.Email);
                if (user != null)
                {
                    string resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

                    resetToken = resetToken.UrlEncode();

                    await _mailService.SendPasswordResetMailAsync(resetDto.Email, user.Id, resetToken);
                    return Ok();
                }
                return BadRequest(new ApiResponse(400 ,"Invalid Request"));

            }
            return BadRequest("Problem with reset password!");

        }

        [HttpPost("verify-resetToken")]
        public async Task<bool> ResetPasswordAsync(VerifyDto verifyDto)
        {
            verifyDto.State = false;
            if (verifyDto.State)
            {

                AppUser user = await _userManager.FindByIdAsync(verifyDto.UserId);
                if (user != null)
                {
                    verifyDto.resetToken.UrlDecode();

                    return await _userManager.VerifyUserTokenAsync(user, _userManager.Options.Tokens.PasswordResetTokenProvider, "ResetPassword", verifyDto.resetToken);

                }
            }
            return false;
        }

        [HttpPost("update-password")]
        public async Task<ActionResult> UpdatePassword(PasswordUpdateDto passwordDto)
        {
            if (ModelState.IsValid)
            {
                AppUser user = await _userManager.FindByIdAsync(passwordDto.userId);
                if (user != null)
                {
                    if (passwordDto.newPassword != passwordDto.confirmPassword)
                        return BadRequest(new ApiResponse(400, "Passwords not match"));

                    passwordDto.resetToken = passwordDto.resetToken.UrlDecode();
                    IdentityResult result = await _userManager.ResetPasswordAsync(user, passwordDto.resetToken, passwordDto.newPassword);
                    if (result.Succeeded)
                        await _userManager.UpdateSecurityStampAsync(user);
                    else
                        return BadRequest("Problem with updating password!");
                    return Ok();
                }
                return BadRequest(new ApiResponse(404, "Invalid Request"));

            }
            return BadRequest("Problem with reset password!");

        }

    }
}