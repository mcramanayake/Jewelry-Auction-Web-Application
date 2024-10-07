﻿namespace JewelryAuctionAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; } // Store the hashed password
        public string Role { get; set; } // "admin" or "user"
    }
}
