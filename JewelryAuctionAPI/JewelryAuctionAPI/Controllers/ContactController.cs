using JewelryAuctionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using JewelryAuctionAPI.Data;

namespace JewelryAuctionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AuctionContext _context;

        public ContactController(AuctionContext context)
        {
            _context = context;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitContactMessage(ContactMessage message)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.AboutTable.Add(message);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Message submitted successfully!" });
        }
    }
}