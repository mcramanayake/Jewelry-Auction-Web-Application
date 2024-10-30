using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JewelryAuctionAPI.Data; // Ensure this is the correct namespace for your DbContext
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Identity;
using JewelryAuctionAPI.Models;

namespace JewelryAuctionAPI.Controllers
{
    public class profiledetails : Controller
    {
        private readonly AuctionContext _context;

        public profiledetails(AuctionContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        // GET api/profiledetails/{id}
        [HttpGet("api/profiledetails/{id}")]
        public async Task<IActionResult> GetProfileDetails(int id)
        {
            var user = await _context.Signups
                .Where(u => u.Id == id) // Assuming Id is the primary key in your Signups table
                .Select(u => new
                {
                    u.Email,
                    u.FirstName,
                    u.LastName // Assuming Username is a field in your Signups table
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST api/profiledetails/update
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
