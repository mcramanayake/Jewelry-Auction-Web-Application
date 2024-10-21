using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JewelryAuctionAPI.Data;
using System.Threading.Tasks;

namespace JewelryAuctionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly AuctionContext _context;

        public SettingsController(AuctionContext context)
        {
            _context = context;
        }

        // GET: api/settings/status
        [HttpGet("status")]
        public async Task<IActionResult> GetMaintenanceStatus()
        {
            var settings = await _context.Settings.FirstOrDefaultAsync();
            if (settings == null)
            {
                return NotFound("Settings not found.");
            }

            return Ok(new { IsMaintenanceMode = settings.IsMaintenanceMode });
        }

        // PATCH: api/settings/toggleMaintenance
        [HttpPatch("toggleMaintenance")]
        public async Task<IActionResult> ToggleMaintenance()
        {
            var settings = await _context.Settings.FirstOrDefaultAsync();
            if (settings == null)
            {
                return NotFound("Settings not found.");
            }

            settings.IsMaintenanceMode = !settings.IsMaintenanceMode; // Toggle the maintenance mode
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
