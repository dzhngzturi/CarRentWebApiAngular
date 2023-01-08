using API.Helpers;
using Core.Interfaces;
using Core.Model;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace API.Extensions
{
    public static class AddEmailServiceExtensions
    {
        public static IServiceCollection ConfigureEmailSender(this IServiceCollection services, IConfiguration configuration)
        {
          

            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IMailService, MailService>();



            return services;
        }
    
    
    }
}
