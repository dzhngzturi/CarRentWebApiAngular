using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace API.Helpers
{
    public class AllowedExtensionsAttribute : ValidationAttribute
    {
        private readonly string[] _extensions;

        public AllowedExtensionsAttribute(string[] extensions)
        {
            _extensions = extensions;
        }


        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var file = value as IFormFile;
            if (file != null)
            {
                var extensions = Path.GetExtension(file.FileName);
                if (extensions != null && !_extensions.Contains(extensions.ToLower()))
                {
                    return new ValidationResult(GetErrorMessage());
                }
            }
            return ValidationResult.Success;
        }

        private string GetErrorMessage()
        {
            return $"This file extension is not allowed!";
        }
    }
}
