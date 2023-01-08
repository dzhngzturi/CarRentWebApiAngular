using System.ComponentModel.DataAnnotations;

namespace API.DTO_s
{
    public class PasswordForgotDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        //[Required]
        //public string Token { get; set; }
        //[Required]
        //[RegularExpression(
        //    "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", ErrorMessage = "Password must have 1 Uppercase, 1 lowercase, 1 number, 1 non alphanumeric and at least 6 charecters")]
        //public string NewPassword { get; set; }
        //[Required]
        //[RegularExpression(
        //    "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", ErrorMessage = "Password must have 1 Uppercase, 1 lowercase, 1 number, 1 non alphanumeric and at least 6 charecters")]
        //public string ConfirmPassword { get; set; }
    }
}
