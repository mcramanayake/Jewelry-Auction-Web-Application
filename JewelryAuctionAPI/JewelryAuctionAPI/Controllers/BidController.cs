using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JewelryAuctionAPI.Models;
using JewelryAuctionAPI.Data;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly AuctionContext _context;

        public BidsController(AuctionContext context)
        {
            _context = context;
        }

        // 1. Create a new bid
        [HttpPost]
        public async Task<ActionResult<Bid>> CreateBid(Bid bid)
        {
            bid.BidDateTime = DateTime.UtcNow; // Set bid time to current UTC time
            _context.Bids.Add(bid);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBidById), new { id = bid.Id }, bid);
        }

        // 2. Get all bids
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bid>>> GetAllBids()
        {
            return await _context.Bids.ToListAsync();
        }

        // 3. Get all bids for a specific item
        [HttpGet("item/{itemId}")]
        public async Task<ActionResult<IEnumerable<Bid>>> GetBidsByItem(int itemId)
        {
            var bids = await _context.Bids.Where(b => b.ItemId == itemId).ToListAsync();
            if (!bids.Any())
            {
                return NotFound(new { message = "No bids found for this item." });
            }
            return bids;
        }

        // 4. Get all bids for a specific user
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Bid>>> GetBidsByUser(int userId)
        {
            var bids = await _context.Bids.Where(b => b.UserId == userId).ToListAsync();
            if (!bids.Any())
            {
                return NotFound(new { message = "No bids found for this user." });
            }
            return bids;
        }

        // 5. Delete a bid
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBid(int id)
        {
            var bid = await _context.Bids.FindAsync(id);
            if (bid == null)
            {
                return NotFound();
            }

            _context.Bids.Remove(bid);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 6. Update a bid
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBid(int id, Bid updatedBid)
        {
            if (id != updatedBid.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedBid).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Bids.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Helper: Get a single bid by ID (public to allow access in API)
        [HttpGet("{id}")]
        public async Task<ActionResult<Bid>> GetBidById(int id)
        {
            var bid = await _context.Bids.FindAsync(id);

            if (bid == null)
            {
                return NotFound();
            }

            return bid;
        }
    }
}
