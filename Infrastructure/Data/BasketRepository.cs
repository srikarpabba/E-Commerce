using System.Text.Json;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly StoreContext _context;
        public BasketRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            var basket = await _context.Set<Basket>().FindAsync(basketId);
            if (basket == null) return false;
            _context.Remove(basket);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var basket = await _context.Baskets.FirstOrDefaultAsync(p => p.Id == basketId);
            if (basket == null) return null;
            return JsonSerializer.Deserialize<CustomerBasket>(basket.BasketData);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            if (basket == null) return null;

            var data = JsonSerializer.Serialize(basket);
            var existingBasket = await _context.Baskets.FirstOrDefaultAsync(p => p.Id == basket.Id);
            if (existingBasket == null)
            { // add new basket
                var newItem = new Basket();
                newItem.Id = basket.Id;
                newItem.BasketData = data;
                newItem.lastUpdated = DateTime.Now;
                await _context.Baskets.AddAsync(newItem);
                await _context.SaveChangesAsync();
            }
            else
            { // update existing basket
                existingBasket.BasketData = data;
                existingBasket.lastUpdated = DateTime.Now;
                _context.Baskets.Update(existingBasket);
                await _context.SaveChangesAsync();
            }
            return basket;
        }
    }
}