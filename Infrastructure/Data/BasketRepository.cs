using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly DataContext _dataContext;

        public BasketRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var basket = await _dataContext.Baskets.FirstOrDefaultAsync(c => c.Id == basketId);
            if (basket == null) return null;
            return JsonSerializer.Deserialize<CustomerBasket>(basket.BasketData);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            if (basket == null) return null;

            var data = JsonSerializer.Serialize(basket);
            var existingBasket = await _dataContext.Baskets.FirstOrDefaultAsync(c => c.Id == basket.Id);
            if (existingBasket == null)
            //add new basket
            {
                var newItem = new Basket();
                newItem.Id = basket.Id;
                newItem.BasketData = data;
                newItem.lastUpdated = DateTime.Now;
                await _dataContext.Baskets.AddAsync(newItem);
                await _dataContext.SaveChangesAsync();
            }
            //update existing basket
            else
            {
                existingBasket.BasketData = data;
                existingBasket.lastUpdated = DateTime.Now;
                _dataContext.Baskets.Update(existingBasket);
                await _dataContext.SaveChangesAsync();
            }
            return basket;

        }

        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            var basket = await _dataContext.Set<Basket>().FindAsync(basketId);
            if (basket == null) return false;
            _dataContext.Remove(basket);
            await _dataContext.SaveChangesAsync();
            return true;
        }

    }
}
