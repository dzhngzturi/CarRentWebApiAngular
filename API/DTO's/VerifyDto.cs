using System.ComponentModel.DataAnnotations;

namespace API.DTO_s
{
    public class VerifyDto
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string resetToken { get; set; }


        public bool State { get; set; }
    }
}
