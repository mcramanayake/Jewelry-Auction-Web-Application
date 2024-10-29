using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JewelryAuctionAPI.Models
{
    public class AuctionItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }  // Unique identifier for the item
        public string? Name { get; set; }  // Name of the item
        public string? Description { get; set; }  // Description of the item
        public float StartingPrice { get; set; }  // Starting price of the item
        public DateTime AuctionDate { get; set; }  // Date of the auction
        public string? ImageUrl { get; set; }  // URL of the item's image
        public float LatestPrice { get; set; }  // Latest price of the item
        public bool Sold { get; set; }  // Indicates whether the item is sold
    }
}
