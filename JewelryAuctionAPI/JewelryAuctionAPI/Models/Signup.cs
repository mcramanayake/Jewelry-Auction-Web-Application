namespace JewelryAuctionAPI.Models
{
    public class Signup
    {
        public int Id { get; set; }  // Primary Key

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
        public string Role { get; set; } = "User";
    }
}
