using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JewelryAuctionAPI.Data; // Ensure this is the correct namespace for your DbContext
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Identity;
using JewelryAuctionAPI.Models;
using Microsoft.Extensions.Hosting;
using System.Data.Entity.Infrastructure;

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

        // POST api/profiledetails/insert
        [HttpPost("api/profiledetails/insert")]
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
            catch (System.Data.Entity.Infrastructure.DbUpdateException ex)
            {
                return BadRequest($"Failed to insert user details: {ex.Message}");
            }
        }
    }
}
