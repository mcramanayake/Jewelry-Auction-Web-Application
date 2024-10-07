using JewelryAuctionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using JewelryAuctionAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch; // Include this line
using System.Linq;

namespace JewelryAuctionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly AuctionContext _context;

        public AuctionController(AuctionContext context)
        {
            _context = context;
        }

        // GET: api/Auction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuctionItem>>> GetItems()
        {
            return await _context.AuctionItems.ToListAsync();
        }

        // POST: api/Auction
        [HttpPost]
        public async Task<ActionResult<AuctionItem>> AddItem(AuctionItem item)
        {
            _context.AuctionItems.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetItems), new { id = item.Id }, item);
        }

        // PUT: api/Auction/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, AuctionItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // PATCH: api/Auction/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchItem(int id, [FromBody] JsonPatchDocument<AuctionItem> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("patchDoc field is required.");
            }

            var item = await _context.AuctionItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            // Apply the patch to the item
            patchDoc.ApplyTo(item);

            // Validate the model state
            if (!TryValidateModel(item))
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _context.SaveChangesAsync(); // Save the changes to the database
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }


        // DELETE: api/Auction/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.AuctionItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.AuctionItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.AuctionItems.Any(e => e.Id == id);
        }
    }
}
