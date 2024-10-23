﻿using Microsoft.AspNetCore.Mvc;
using JewelryAuctionAPI.Models;
using JewelryAuctionAPI.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;  // For password hashing
using System;

namespace JewelryAuctionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Users : ControllerBase
    {
        private readonly AuctionContext _context;

        public Users(AuctionContext context)
        {
            _context = context;
        }

        [HttpPost("signup")]
        public async Task<ActionResult<SignupResponse>> Signup([FromBody] Signup signup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Hash the password before saving it to the database
            

            // Add the new user to the database
            _context.Signups.Add(signup);
            await _context.SaveChangesAsync();

            // Create the response object
            var response = new SignupResponse
            {
                Message = "Registered User",
                User = signup
            };

            // Return CreatedAtAction with a success message and the user details
            return CreatedAtAction(nameof(Signup), new { id = signup.Id }, response);
        }

        public class SignupResponse
        {
            public string Message { get; set; }
            public Signup User { get; set; }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Signup>>> GetUsers()
        {
            var users = await _context.Signups.ToListAsync();
            return Ok(users);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Email and password are required");
            }

            // Find the user by email
            var user = await _context.Signups.SingleOrDefaultAsync(u => u.Email == request.Email);

            // Check if user exists
            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            // Check if the provided password matches the stored password directly
            // Note: This is NOT recommended for production use!
            if (user.Password != request.Password)  // Direct comparison, not secure
            {
                return Unauthorized("Invalid email or password");
            }

            return Ok(new { Message = "Login successful" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Signups.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Signups.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }


        [HttpPatch("{id}/makeAdmin")]
        public async Task<IActionResult> MakeAdmin(int id)
        {
            var user = await _context.Signups.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Role = "Admin"; // Assuming your role column allows "Admin"
            await _context.SaveChangesAsync();
            return NoContent();
        }



    }
}
