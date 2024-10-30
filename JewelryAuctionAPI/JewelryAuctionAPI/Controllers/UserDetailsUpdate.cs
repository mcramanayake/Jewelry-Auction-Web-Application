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

        // POST: api/UserDetailsUpdate/update
        [HttpPost("update")]
        public async Task<IActionResult> UpdateUserDetails([FromBody] UserDetails model)
        {
            var userDetails = _context.UserDetails.FirstOrDefault(u => u.Id == model.Id);

            if (userDetails == null)
            {
                return NotFound("User details not found.");
            }

            // Update fields
            userDetails.PhoneNumber = model.PhoneNumber;
            userDetails.Address = model.Address;
            userDetails.City = model.City;
            userDetails.PostalCode = model.PostalCode;

            try
            {
                await _context.SaveChangesAsync();
                return Ok("User details updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to update user details: {ex.Message}");
            }
        }


    }
}
