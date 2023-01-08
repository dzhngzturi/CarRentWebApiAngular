using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "TestUser",
                        Email = "test@gmail.com",
                        UserName = "test@gmail.com",
                        Address = new Address
                        {
                            FirstName = "Test",
                            LastName = "User",
                            Street = "10 Trumstr.",
                            City = "Berlin",
                            State = "Moabit",
                            Zipcode = "1234",

                        }
                    },

                    new AppUser
                    {
                        DisplayName = "Admin",
                        Email = "admin@admin.com",
                        UserName = "admin@admin.com"
                    }
                };

                var roles = new List<AppRole>
                {
                    new AppRole { Name = "Admin"},
                    new AppRole { Name = "User"}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role); 
                }

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "P@ssword1");
                    await userManager.AddToRoleAsync(user, "User");
                    if (user.Email == "admin@admin.com") await userManager.AddToRoleAsync(user, "Admin");
                    
                }

            }
        }
    }
}
