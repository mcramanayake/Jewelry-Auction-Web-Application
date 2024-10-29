﻿using Microsoft.EntityFrameworkCore;
using JewelryAuctionAPI.Models;

namespace JewelryAuctionAPI.Data
{
    public class AuctionContext : DbContext
    {
        public AuctionContext(DbContextOptions<AuctionContext> options) : base(options) { }

        
        public DbSet<SellWithUsItem> SellWithUsTable { get; set; }
        public DbSet<Settings> Settings { get; set; }
        public DbSet<Signup> Signups { get; set; }
        public object AboutTable { get; internal set; }
    }
}
