using System.Reflection;
using System.Text.Json;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {

            if (!context.ProductBrands.Any())
            {
                var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                context.ProductBrands.AddRange(brands);
            }


            if (!context.ProductTypes.Any())
            {
                var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                context.ProductTypes.AddRange(types);
            }

            if (!context.ProductGenders.Any())
            {
                var gendersData = File.ReadAllText("../Infrastructure/Data/SeedData/genders.json");
                var genders = JsonSerializer.Deserialize<List<ProductGender>>(gendersData);
                context.ProductGenders.AddRange(genders);
            }

            if (!context.ProductAgeGroups.Any())
            {
                var ageGroupsData = File.ReadAllText("../Infrastructure/Data/SeedData/agegroup.json");
                var ageGroup = JsonSerializer.Deserialize<List<ProductAgeGroup>>(ageGroupsData);

                context.ProductAgeGroups.AddRange(ageGroup);
            }

            if (!context.Products.Any())
            {
                var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");

                var products = JsonSerializer.Deserialize<List<ProductSeedModel>>(productsData);

                foreach (var item in products)
                {
                    var pictureFileName = item.PictureUrl.Substring(16);
                    var product = new Product
                    {
                        Name = item.Name,
                        Description = item.Description,
                        Price = item.Price,
                        ProductBrandId = item.ProductBrandId,
                        ProductTypeId = item.ProductTypeId,
                        ProductGenderId = item.ProductGenderId,
                        ProductAgeGroupId = item.ProductAgeGroupId
                    };
                    product.AddPhoto(item.PictureUrl, pictureFileName);
                    context.Products.Add(product);
                }

                await context.SaveChangesAsync();                
            }

            if (!context.DeliveryMethods.Any())
            {
                var dmData = File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");
                var deliveryMethods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);
                context.DeliveryMethods.AddRange(deliveryMethods);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}