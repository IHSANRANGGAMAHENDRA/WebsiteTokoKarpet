using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public PaymentController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _httpClient = new HttpClient();
        }

        [HttpPost("token/{orderId}")]
        public async Task<IActionResult> GetSnapToken(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product) // Include Product to get names
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null) return NotFound("Order not found");

            // 1. Prepare Midtrans Payload
            var serverKey = _configuration["Midtrans:ServerKey"];
            var isProduction = bool.Parse(_configuration["Midtrans:IsProduction"] ?? "false");
            var snapUrl = isProduction 
                ? "https://app.midtrans.com/snap/v1/transactions" 
                : "https://app.sandbox.midtrans.com/snap/v1/transactions";

            var payload = new
            {
                transaction_details = new
                {
                    order_id = $"ORDER-{order.Id}-{DateTime.Now.Ticks}", // Unique Order ID required by Midtrans
                    gross_amount = (int)order.TotalAmount
                },
                item_details = order.OrderItems.Select(item => new
                {
                    id = item.ProductId.ToString(),
                    price = (int)item.Price,
                    quantity = item.Quantity,
                    name = item.Product?.Name.Length > 50 ? item.Product.Name.Substring(0, 50) : (item.Product?.Name ?? "Item")
                }).ToList(),
                customer_details = new
                {
                    first_name = order.ShippingName ?? "Customer",
                    email = "customer@example.com", // In real app, fetch from User
                    phone = "08123456789", // In real app, extract from ShippingAddress
                    shipping_address = new
                    {
                        address = order.ShippingAddress
                    }
                }
            };

            // 2. Send Request to Midtrans
            var request = new HttpRequestMessage(HttpMethod.Post, snapUrl);
            var authHeader = Convert.ToBase64String(Encoding.UTF8.GetBytes(serverKey + ":"));
            request.Headers.Add("Authorization", $"Basic {authHeader}");
            request.Headers.Add("Accept", "application/json");
            
            var jsonPayload = JsonSerializer.Serialize(payload);
            request.Content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.SendAsync(request);
                var responseString = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    return BadRequest($"Midtrans Error: {responseString}");
                }

                // 3. Return Token
                return Ok(responseString); // Contains { token: "..." }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
