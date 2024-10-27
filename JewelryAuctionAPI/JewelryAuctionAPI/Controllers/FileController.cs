using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using JewelryAuctionAPI.Models;

namespace JewelryAuctionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        [HttpPost("upload"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadFile([FromForm] FileUploadModel model)
        {
            if (model.File == null && model.File.Length == 0)
            {
                return BadRequest("Invalid File");
            }

            var folderName = Path.Combine("Uploads", "SellItems");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (!Directory.Exists(pathToSave))
            {
                Directory.CreateDirectory(pathToSave);
            }

            var fileName = model.File.FileName;
            var fullPath = Path.Combine(pathToSave, fileName);
            var dbPath = Path.Combine(folderName, fileName);

            if (System.IO.File.Exists(fullPath))
            {
                return BadRequest("File already exists");
            }

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                model.File.CopyTo(stream);
            }



            return Ok(new {dbPath});
        }
    }
}
