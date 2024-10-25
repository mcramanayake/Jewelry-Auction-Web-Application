using System.ComponentModel.DataAnnotations;

namespace JewelryAuctionAPI.Models
{
    public class SellWithUsItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ItemName { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string Message { get; set; }

        public string FilePath { get; set; }
    }
}
