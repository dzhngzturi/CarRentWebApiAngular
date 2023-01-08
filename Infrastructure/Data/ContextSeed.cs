using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ContextSeed
    {
        public static async Task SeedAsync(DataContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.CarBrands.Any())
                {
                    var carBrandsData = File.ReadAllText("../Infrastructure/Data/SeedData/BrandSeed.json");
                    var brands = JsonSerializer.Deserialize<List<CarBrand>>(carBrandsData);

                    foreach (var item in brands)
                    {
                        context.CarBrands.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.CarTypes.Any())
                {
                    var carTypesData = File.ReadAllText("../Infrastructure/Data/SeedData/TypeSeed.json");
                    var types = JsonSerializer.Deserialize<List<CarType>>(carTypesData);

                    foreach (var item in types)
                    {
                        context.CarTypes.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Cars.Any())
                {
                    var carsData = File.ReadAllText("../Infrastructure/Data/SeedData/CarSeed.json");

                    var cars = JsonSerializer.Deserialize<List<CarSeedModel>>(carsData);

                    foreach (var item in cars)
                    {
                        var pictureFileName = item.PictureUrl.Substring(16);
                        var car = new Car
                        {
                            Name = item.Name,
                            Year = item.Year,
                            Fuel = item.Fuel,
                            Price = item.Price,
                            CarBrandId = item.CarBrandId,
                            CarTypeId = item.CarTypeId,
                        };

                        car.AddPhoto(item.PictureUrl, pictureFileName);
                        context.Cars.Add(car);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.DeliveryMethods.Any())
                {
                    var dmData = File.ReadAllText("../Infrastructure/Data/SeedData/DeliverySeed.json");

                    var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

                    foreach (var item in methods)
                    {
                        context.DeliveryMethods.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<ContextSeed>();
                logger.LogError(ex.Message);
            }
        }

    }
}
