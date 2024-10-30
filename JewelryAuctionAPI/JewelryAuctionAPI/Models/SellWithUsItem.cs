using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JewelryAuctionAPI.Models
{
    public class SellWithUsItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Item name is required.")]
       
        public string? ItemName { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Message cannot be empty.")]
        
        public string? Message { get; set; }

        public string? FilePath { get; set; }

        // Updated fields (without StartingPrice)
        public float LatestPrice { get; set; }  // This can be set during submission or updated in the auction flow

        public DateTime AuctionDate { get; set; } = DateTime.Now;  // Default to current date

        public bool Sold { get; set; } = false;  // Default to not sold
    }
}
