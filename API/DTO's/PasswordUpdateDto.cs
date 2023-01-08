using System.ComponentModel.DataAnnotations;

namespace API.DTO_s
{
    public class PasswordUpdateDto
    {
        [Required]
        public string userId { get; set; }

        [Required]
        public string resetToken { get; set; }

        [Required]
        [RegularExpression(
            "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", ErrorMessage = "Password must have 1 Uppercase, 1 lowercase, 1 number, 1 non alphanumeric and at least 6 charecters")]
        public string newPassword { get; set; }

        [Required]
        public string confirmPassword { get; set; }

    }
}
