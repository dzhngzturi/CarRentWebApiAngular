using API.Helpers;

namespace API.DTO_s
{
    public class CarPhotoDto
    {
        [MaxFileSize(2 * 1024 * 1024)]
        [AllowedExtensions(new [] {".jpg", ".png", ".jpeg"})]
        public IFormFile Photo { get; set; }
    }
}
