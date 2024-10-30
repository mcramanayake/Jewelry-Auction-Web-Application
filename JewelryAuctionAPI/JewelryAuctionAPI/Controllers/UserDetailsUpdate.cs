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

        // POST api/UserDetailsUpdate/update
        [HttpPost("update")]
        public async Task<IActionResult> UpdateUserDetails([FromBody] UserDetails userDetails)
        {
            if (userDetails == null || userDetails.Id == 0)
            {
                return BadRequest("Invalid user details.");
            }

            // Check if the user exists in the Signups table
            var signupExists = await _context.Signups.AnyAsync(s => s.Id == userDetails.Id);
            if (!signupExists)
            {
                return NotFound("Signup ID not found.");
            }

            // Check if UserDetails already exist for the SignupId
            var existingUserDetails = await _context.UserDetails
                .FirstOrDefaultAsync(u => u.Id == userDetails.Id);

            if (existingUserDetails == null)
            {
                // Create a new UserDetails entry
                _context.UserDetails.Add(userDetails);
            }
            else
            {
                // Update existing UserDetails entry
                existingUserDetails.PhoneNumber = userDetails.PhoneNumber;
                existingUserDetails.Address = userDetails.Address;
                existingUserDetails.City = userDetails.City;
                existingUserDetails.PostalCode = userDetails.PostalCode;
                _context.UserDetails.Update(existingUserDetails);
            }

            await _context.SaveChangesAsync();
            return Ok("User details updated successfully.");
        }
    }
}
