using System.ComponentModel.DataAnnotations;

namespace JewelryAuctionAPI.Models
{
    public class ContactMessage
    {
        public int Id { get; set; }

        [Required, MinLength(3, ErrorMessage = "Name must be at least 3 characters long.")]
        public string? Name { get; set; }

        [Required, EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Message cannot be empty.")]
        public string? Message { get; set; }

        public DateTime DateSubmitted { get; set; } = DateTime.UtcNow;
    }
}
