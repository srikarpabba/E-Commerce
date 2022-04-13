using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "SrikarPabba",
                    Email = "pabbasrikar@gmail.com",
                    UserName = "SrikarPabba",
                    PhoneNumber = "8608708021",
                    Address = new Address{
                        FirstName = "Srikar",
                        LastName = "Pabba",                        
                        AddressLine = "13-30/16",
                        City = "Hyderabad",
                        State = "TS",
                        ZipCode = "502032"
                    }

                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}