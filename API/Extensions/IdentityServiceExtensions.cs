using Core.Entities.Identity;
using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddDbContext<StoreContext>(x =>
            {
                x.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
            services.AddDbContext<AppIdentityDbContext>(x =>
            {
                x.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                var configuration = ConfigurationOptions.Parse(config.GetConnectionString("Redis"), true);
                return ConnectionMultiplexer.Connect(configuration);
            });

            services.AddIdentity<AppUser, AppRole>(x =>
            {
                x.SignIn.RequireConfirmedEmail = true;
                x.Tokens.EmailConfirmationTokenProvider = "emailconfirmation";
                x.Lockout.AllowedForNewUsers = true;
                x.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(2);
                x.Lockout.MaxFailedAccessAttempts = 3;
            })
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddRoleValidator<RoleValidator<AppRole>>()
            .AddRoleManager<RoleManager<AppRole>>()
            .AddDefaultTokenProviders();


            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
                        ValidIssuer = config["Token:Issuer"],
                        ValidAudience = config["Token:Audience"],
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                    };
                });
            services.AddHttpClient();

            services.AddAuthorization();

            return services;
        }
    }
}