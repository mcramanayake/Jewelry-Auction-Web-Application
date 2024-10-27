using JewelryAuctionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using JewelryAuctionAPI.Data;
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

           // _context.SellWithUsTable.Add(item);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Item submitted successfully!" });
        }
    }
}