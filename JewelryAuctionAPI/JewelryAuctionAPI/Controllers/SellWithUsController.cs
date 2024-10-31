using JewelryAuctionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using JewelryAuctionAPI.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace JewelryAuctionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SellWithUsController : ControllerBase
    {
        private readonly AuctionContext _context;

        public SellWithUsController(AuctionContext context)
        {
            _context = context;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitSellItem(SellWithUsItem item)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Initialize LatestPrice to Price if needed
            item.LatestPrice = (float)item.Price;

            // Uncomment and ensure SellWithUsTable is configured in the context
            // _context.SellWithUsTable.Add(item);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Item submitted successfully!" });
        }

        // DELETE: api/sellwithus/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSellWithUsItem(int id)
        {
            var item = await _context.SellWithUsTable.FindAsync(id);
            if (item == null) return NotFound(new { success = false, message = "Item not found" });

            _context.SellWithUsTable.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Item deleted successfully" });
        }

        // GET: api/sellwithus
        [HttpGet]
        public async Task<IActionResult> GetSellWithUsItems()
        {
            // Fetch all items
            var items = await _context.SellWithUsTable.ToListAsync();

            // Check if any item's auction date is more than 7 days in the past, mark as sold if so
            var today = DateTime.UtcNow;
            foreach (var item in items)
            {
                if ((today - item.AuctionDate).TotalDays >= 7 && !item.Sold)
                {
                    item.Sold = true;
                }
            }

            // Save any changes made to items
            await _context.SaveChangesAsync();

            return Ok(items);
        }

        // GET: api/sellwithus/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSellWithUsItem(int id)
        {
            var item = await _context.SellWithUsTable.FindAsync(id);
            if (item == null)
            {
                return NotFound(new { success = false, message = "Item not found" });
            }

            // Check if the item should be marked as sold
            var today = DateTime.UtcNow;
            if ((today - item.AuctionDate).TotalDays >= 7 && !item.Sold)
            {
                item.Sold = true;
                await _context.SaveChangesAsync();
            }

            return Ok(item);
        }
    }
}
