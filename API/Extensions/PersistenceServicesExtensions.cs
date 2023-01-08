using API.Errors;
using API.Helpers;
using Core.Interfaces;
using Infrastructure;
using Infrastructure.Data;
using Infrastructure.Data.Identity;
using Infrastructure.Services;
using Infrastructure.Services.TokenService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Extensions
{
    public static class PersistenceServicesExtensions
    {
        public static IServiceCollection ConfigurePersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddTransient<IPaymentService, PaymentService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IUnitOfWork,UnitOfWork>();
            services.AddDbContext<DataContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<AppIdentityDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("IdentityConnection")));
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
            services.AddScoped<ICarRepository, CarRepository>();
            services.AddAutoMapper(typeof(MappingProfiles));

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errrors = actionContext.ModelState.Where(e => e.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errrors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

            return services;
        }
    }
}
