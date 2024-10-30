using JewelryAuctionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using JewelryAuctionAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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
            var items = await _context.SellWithUsTable.ToListAsync();
            return Ok(items);
        }
    }
}
