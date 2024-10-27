using Microsoft.AspNetCore.Mvc;

namespace JewelryAuctionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            var filename = Path.GetFileName(file.FileName);
            try
            {
                var extenson = Path.GetExtension(file.FileName);

                var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

                if (!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);
                }
                var completepath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", filename);

                using (var stream = new FileStream(completepath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception ex)
            {

            }
            return Ok(filename);
        }
        
    }
}
