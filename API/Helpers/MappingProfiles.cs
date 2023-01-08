using API.DTO_s;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<AppUser, PasswordUpdateDto>();
            CreateMap<AppUser, PasswordForgotDto>();

            CreateMap<CarBrand, CarBrandCreateDto>().ReverseMap();
            CreateMap<CarBrand, CarBrandReturnDto>().ReverseMap();

            CreateMap<CarType, CarTypeCreateDto>().ReverseMap();
            CreateMap<CarType, CarTypeReturnDto>().ReverseMap();

            CreateMap<Photo, PhotoToReturnDto>().ForMember(d => d.PictureUrl, o => 
                                                    o.MapFrom<PhotoUrlResolver>());
            CreateMap<Car, CarCreateDto>().ReverseMap();
            CreateMap<Car, CarReturnDto>()
                .ForMember(d => d.CarType, o => o.MapFrom(s => s.Type.Name))
                .ForMember(d => d.CarBrand, o => o.MapFrom(s => s.Brand.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<CarUrlResolver>()); 
            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>().ReverseMap();
            CreateMap<Order, OrderToReturnDto>().ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName));
            CreateMap<OrderItem, OrderItemDto>().ForMember(d => d.CarId, o => o.MapFrom(s => s.ItemOrdered.CarItemId))
                                                .ForMember(d => d.CarName, o => o.MapFrom(s => s.ItemOrdered.CarName))
                                                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                                                .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
            CreateMap<CustomerBasket,CustomerBasketDto>().ReverseMap(); 
            CreateMap<BasketItem, BasketItemDto>().ReverseMap();

        }
    }
}
