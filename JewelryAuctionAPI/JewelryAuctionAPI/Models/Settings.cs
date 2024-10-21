using System.ComponentModel.DataAnnotations;

namespace JewelryAuctionAPI.Models
{
    public class Settings
    {
        [Key]
        public int Id { get; set; }
        public bool IsMaintenanceMode { get; set; }
    }
}
