using Core.Entities;

namespace Core.Interfaces
{
    public interface ICarRepository
    {
        Task<Car>GetCarByIdAsync(int id);
        Task<IReadOnlyList<Car>>GetCarsAsync();
        Task<IReadOnlyList<CarBrand>>GetCarBrandsAsync();
        Task<IReadOnlyList<CarType>>GetCarTypesAsync();

    }
}