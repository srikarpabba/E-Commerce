using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
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
                    DisplayName = "Srikar",
                    Email = "pabbasrikar@gmail.com",
                    UserName = "pabbasrikar@gmail.com",
                    PhoneNumber = "8608708021",
                    Address = new Address
                    {
                        FirstName = "Srikar",
                        LastName = "Pabba",
                        AddressLine = "13-30/16, Beeramguda",
                        City = "Hyderabad",
                        State = "TS",
                        ZipCode = "502032"
                    }
                    },
                    new AppUser
                    {
                        DisplayName = "Admin",
                        Email = "admin@ecommerce.com",
                        UserName = "admin@ecommerce.com",
                        PhoneNumber = "1234567890"
                    }
                };

                var roles = new List<AppRole>
                {
                    new AppRole {Name = "Admin"},
                    new AppRole {Name = "Member"}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Member");
                    if (user.Email == "admin@ecommerce.com") await userManager.AddToRoleAsync(user, "Admin");
                }


            }
        }
    }
}