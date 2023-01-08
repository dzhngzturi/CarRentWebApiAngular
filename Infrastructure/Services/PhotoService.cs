using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class PhotoService : IPhotoService
    {
        public async Task<Photo> SaveToDiskAsync(IFormFile file)
        {
            var photo = new Photo();
            if (file.Length > 0)
            {
                var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine("Content/images/Cars/", fileName);
                await using var fileStream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(fileStream);

                photo.FileName = fileName;
                photo.PictureUrl = "Content/images/Cars/" + fileName;

                return photo;
            }
            return null;
        }

        public void DeleteFromDisk(Photo photo)
        {
            if (File.Exists(Path.Combine("Content/images/Cars", photo.FileName)))
            {
                File.Delete("Content/images/Cars/" + photo.FileName);
            }
        }

    }
}
