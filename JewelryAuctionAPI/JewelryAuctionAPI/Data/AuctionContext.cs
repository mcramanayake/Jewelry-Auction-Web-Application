using Microsoft.EntityFrameworkCore;
using JewelryAuctionAPI.Models;

namespace JewelryAuctionAPI.Data
{
    public class AuctionContext : DbContext
    {
        public AuctionContext(DbContextOptions<AuctionContext> options) : base(options) { }

        public DbSet<SellWithUsItem> SellWithUsTable { get; set; }
        public DbSet<Settings> Settings { get; set; }
        public DbSet<Signup> Signups { get; set; }
        public DbSet<Bid> Bids { get; set; }
        public DbSet<ContactMessage> AboutTable { get; set; }
        public DbSet<AuctionItem> AuctionItems { get; set; }
        public DbSet<UserDetails> UserDetails { get; set; }
    }
}
