using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JewelryAuctionAPI.Models
{
    public class Bid
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime BidDateTime { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int ItemId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal BidAmount { get; set; }
    }
}
