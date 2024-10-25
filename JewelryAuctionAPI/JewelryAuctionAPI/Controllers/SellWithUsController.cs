using JewelryAuctionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using JewelryAuctionAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace JewelryAuctionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellWithUsController : ControllerBase
    {
        private readonly AuctionContext _context;

        public SellWithUsController(AuctionContext context)
        {
            _context = context;
        }

        [HttpPost("sell-item")]
        public async Task<IActionResult> PostSellItem([FromForm] SellWithUsItemDto sellWithUsItemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sellWithUsItem = new SellWithUsItem
            {
                ItemName = sellWithUsItemDto.ItemName,
                Price = sellWithUsItemDto.Price,
                Message = sellWithUsItemDto.Message
            };

            // Handle file upload
            if (sellWithUsItemDto.File != null)
            {
                var filePath = Path.Combine("Uploads", sellWithUsItemDto.File.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await sellWithUsItemDto.File.CopyToAsync(stream);
                }
                sellWithUsItem.FilePath = filePath;
            }

            _context.SellWithUsTable.Add(sellWithUsItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Item submitted successfully!" });
        }
    }

    public class SellWithUsItemDto
    {
        [Required]
        public string ItemName { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string Message { get; set; }

        public IFormFile File { get; set; }
    }
}
