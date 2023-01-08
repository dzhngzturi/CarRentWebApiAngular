using Core.Entities.Identity;
using Core.Interfaces;
using Core.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMailService _mailService;

        public AuthService(
            UserManager<AppUser> userManager,
            IMailService mailService
            )
        {
            _userManager = userManager;
            _mailService = mailService;
        }

        public async Task PasswordResetAsync(string email)
        {
            AppUser user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                string resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

                byte[] tokenBytes = Encoding.UTF8.GetBytes(resetToken);
                resetToken = WebEncoders.Base64UrlEncode(tokenBytes);


                await _mailService.SendPasswordResetMailAsync(email, user.Id, resetToken);
            }
        }

     
    }
}
