using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WishlistController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<WishlistItem>>> GetWishlist(int userId)
        {
            var wishlist = await _context.Wishlists
                .Include(w => w.WishlistItems)
                .ThenInclude(wi => wi.Product)
                .FirstOrDefaultAsync(w => w.UserId == userId);
            
            if (wishlist == null)
            {
                // Create one if it doesn't exist
                wishlist = new Wishlist { UserId = userId };
                _context.Wishlists.Add(wishlist);
                await _context.SaveChangesAsync();
            }

            return wishlist.WishlistItems;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToWishlist([FromQuery] int userId, [FromQuery] int productId)
        {
            var wishlist = await _context.Wishlists.FirstOrDefaultAsync(w => w.UserId == userId);
            if (wishlist == null)
            {
                wishlist = new Wishlist { UserId = userId };
                _context.Wishlists.Add(wishlist);
                await _context.SaveChangesAsync();
            }

            if (!_context.WishlistItems.Any(wi => wi.WishlistId == wishlist.Id && wi.ProductId == productId))
            {
                _context.WishlistItems.Add(new WishlistItem { WishlistId = wishlist.Id, ProductId = productId });
                await _context.SaveChangesAsync();
            }

            return Ok("Added to wishlist");
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveFromWishlist([FromQuery] int userId, [FromQuery] int productId)
        {
             var wishlist = await _context.Wishlists.Include(w => w.WishlistItems)
                                    .FirstOrDefaultAsync(w => w.UserId == userId);
            
            if (wishlist != null)
            {
                var item = wishlist.WishlistItems.FirstOrDefault(wi => wi.ProductId == productId);
                if (item != null)
                {
                    _context.WishlistItems.Remove(item);
                    await _context.SaveChangesAsync();
                }
            }

            return Ok("Removed from wishlist");
        }
    }
}
