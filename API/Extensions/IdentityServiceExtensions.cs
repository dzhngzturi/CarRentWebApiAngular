using Core.Entities.Identity;
using Infrastructure.Data.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Extensions
{
    public static class IdentityServiceExtensions 
    {
        public static IServiceCollection AddIdentityServices (this IServiceCollection services, IConfiguration config)
        {
            var builder = services.AddIdentityCore<AppUser>();

            builder = new IdentityBuilder(builder.UserType, typeof(AppRole), builder.Services);
            builder.AddEntityFrameworkStores<AppIdentityDbContext>().AddDefaultTokenProviders();
            builder.Services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromHours(2));
            builder.AddSignInManager<SignInManager<AppUser>>();
            builder.AddRoleManager<RoleManager<AppRole>>();
            builder.AddRoleValidator<RoleValidator<AppRole>>();

         
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
                        ValidIssuer = config["Token:Issuer"],
                        ValidateIssuer = true,
                        ValidateAudience = false
                    };
                });
           

            return services;

        }
    }
}
