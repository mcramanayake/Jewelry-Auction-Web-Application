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
    }
}
