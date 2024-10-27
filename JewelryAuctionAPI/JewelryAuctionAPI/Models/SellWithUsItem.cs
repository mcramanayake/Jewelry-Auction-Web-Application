using System.ComponentModel.DataAnnotations;

namespace JewelryAuctionAPI.Models
{
    public class SellWithUsItem
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Item name is required.")]
        [MinLength(3, ErrorMessage = "Item name must be at least 3 characters long.")]
        public string? ItemName { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be a positive number.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Message cannot be empty.")]
        [MinLength(10, ErrorMessage = "Message must be at least 10 characters long.")]
        public string? Message { get; set; }

        public string? FilePath { get; set; }
    }
}
