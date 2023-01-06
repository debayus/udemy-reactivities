using Domain;
using Persistence;

namespace API.Extensions;

public static class IdentityServerExtensions
{
    public static IServiceCollection AddIdentityService(
        this IServiceCollection services,
        IConfiguration config)
    {
        services.AddIdentityCore<AppUser>(opt =>
        {
            opt.Password.RequireNonAlphanumeric = false;
        })
        .AddEntityFrameworkStores<DataContext>();

        services.AddAuthentication();

        return services;
    }
}
