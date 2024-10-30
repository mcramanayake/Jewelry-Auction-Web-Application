using JewelryAuctionAPI.Data;
using JewelryAuctionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JewelryAuctionAPI.Controllers
{
    public class UserDetailsUpdate : Controller
    {
        private readonly AuctionContext _context;

        public UserDetailsUpdate(AuctionContext context)
        {
            _context = context;
        }

        // POST api/UserDetailsUpdate/insert
        [HttpPost("api/UserDetailsUpdate/insert")]
        public async Task<IActionResult> InsertUserDetails([FromBody] UserDetails model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if user exists in Signups table
            var user = await _context.Signups.FindAsync(model.Id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Create a new UserDetail entity
            var userDetails = new UserDetails
            {
                Id = model.Id, // Assigning the Id from Signups
                PhoneNumber = model.PhoneNumber,
                Address = model.Address,
                City = model.City,
                PostalCode = model.PostalCode
            };

            // Add to the UserDetails table
            await _context.UserDetails.AddAsync(userDetails);

            try
            {
                await _context.SaveChangesAsync();
                return Ok("User details inserted successfully.");
            }
            catch (DbUpdateException ex)
            {
                return BadRequest($"Failed to insert user details: {ex.Message}");
            }
        }

        // GET api/UserDetailsUpdate/{id}
        [HttpGet("api/UserDetailsUpdate/{id}")]
        public async Task<IActionResult> GetProfileDetails(int id)
        {
            var userDetails = await _context.UserDetails
                .Where(u => u.Id == id) // Assuming UserId is the primary key in your UserDetails table
                .Select(u => new
                {
                    u.PhoneNumber,
                    u.Address,
                    u.City,
                    u.PostalCode
                })
                .FirstOrDefaultAsync();

            if (userDetails == null)
            {
                return NotFound();
            }

            return Ok(userDetails);
        }
    }
}
