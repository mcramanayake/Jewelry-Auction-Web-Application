using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using System.Collections.Generic;
namespace JewelryAuctionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : Controller
    {
        [HttpPost]
        public ActionResult CreateCheckoutSession()
        {
            StripeConfiguration.ApiKey = "sk_test_51QBd7iD1uio32G42Edo3nBAIpQLoKMgaPKoxir05NoCMXtKcbJtXOSPokwBXxdC9TYsfNYv2jopqNDSo6mUSmybo00nYpcBW57";

            var domain = "https://localhost:3000"; // Your domain

            var options = new SessionCreateOptions()
            {
                LineItems = new List<SessionLineItemOptions>()
                {
                    new SessionLineItemOptions()
                    {
                        Price = "price_1QBdAiD1uio32G42hw4W2vqZ", // Use your Price ID from Stripe
                        Quantity = 1, // Required, but we can set it to 1
                    }
                },
                PaymentMethodTypes = new List<string>() { "card" }, // Payment method
                Mode = "payment", // Payment mode
                SuccessUrl = $"{domain}/success.html", // Success URL
                CancelUrl = $"{domain}/cancel.html", // Cancel URL
            };

            var service = new SessionService();
            Session session = service.Create(options); // Create the session

            return Ok(new { url = session.Url }); // Return the session URL
        }
    }
}
