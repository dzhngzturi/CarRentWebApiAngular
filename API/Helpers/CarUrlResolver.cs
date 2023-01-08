using API.DTO_s;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class CarUrlResolver : IValueResolver<Car, CarReturnDto, string>
    {
        private readonly IConfiguration _config;

        public CarUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Car source, CarReturnDto destination, string destMember, ResolutionContext context)
        {
            var photo = source.Photos.FirstOrDefault(x => x.IsMain);   
            
            if (photo != null)
            {
                return _config["ApiUrl"] + photo.PictureUrl;
            }

            return _config["ApiUrl"] + "images/cars/placeholder.png";
        }
    }
}
