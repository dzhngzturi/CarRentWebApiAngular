using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1",
                Description = 
                    "Web API for developers to browse through." +
                    "Use your own keys in appsettings.json to authenticate requests while creating order" + 
                    "You can view and manage your API keys in the Stripe Dashboard." +
                    "Test mode secret keys have the prefix sk_test_ and publishable keys have prefix pk_test_." 
                });

                var securitySchema = new OpenApiSecurityScheme
                {
                    Description = "JWT Auth Bearer Scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };

                c.AddSecurityDefinition("Bearer", securitySchema);
                var securityRequirement = new OpenApiSecurityRequirement 
                { 
                    { securitySchema, new [] {"Bearer"}} 
                };
                
                c.AddSecurityRequirement(securityRequirement);

               // c.CustomSchemaIds(type => type.ToString());
            });

            return services;
        }


        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/Swagger/v1/swagger.json", "API v1"));

            return app;
        }
    }
}
