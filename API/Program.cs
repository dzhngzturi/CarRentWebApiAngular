using API.Middleware;
using API.Extensions;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Data.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.ConfigurePersistenceServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.ConfigureEmailSender(builder.Configuration);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerDocumentation();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
    });
});


var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseStatusCodePagesWithReExecute("/errors/{0}");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("CorsPolicy");
app.UseSwaggerDocumentation();
app.UseStaticFiles();

app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), "Content","images","cars")),
        RequestPath = "/Content/images/cars"
    });

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();
    try
    {
        var context = services.GetRequiredService<DataContext>();
        await context.Database.MigrateAsync();
        await ContextSeed.SeedAsync(context, loggerFactory);


        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
       
        var identityContext = services.GetRequiredService<AppIdentityDbContext>();
       
        await identityContext.Database.MigrateAsync();
        await AppIdentityDbContextSeed.SeedUsersAsync(userManager, roleManager);
    }
    catch (Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>();
        logger.LogError(ex, "An error occured during migrations");
    }
}

app.Run();

