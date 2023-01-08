using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class CarRepository : ICarRepository
    {
        private readonly DataContext _context;
        public CarRepository(DataContext context)
        {
            _context = context;

        }

        public async Task<Car> GetCarByIdAsync(int id)
        {
            return await _context.Cars.FindAsync(id);
        }

        public async Task<IReadOnlyList<Car>> GetCarsAsync()
        {
            return await _context.Cars.ToListAsync();
        }
        
        public async Task<IReadOnlyList<CarBrand>> GetCarBrandsAsync()
        {
            return await _context.CarBrands.ToListAsync();
        }
        public async Task<IReadOnlyList<CarType>> GetCarTypesAsync()
        {
            return await _context.CarTypes.ToListAsync();
        }
    }
}