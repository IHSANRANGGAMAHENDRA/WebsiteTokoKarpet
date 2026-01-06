using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetUsers()
        {
            // Return only necessary fields, exclude password hash
            return await _context.Users
                .Where(u => u.Role == "Customer")
                .Select(u => new 
                {
                    u.Id,
                    u.Username,
                    // u.Email, // We don't have Email in User model yet, using Username as proxy or add it later if needed
                    Role = u.Role,
                    JoinDate = u.CreatedAt // Assuming we have CreatedAt, if not we might need to add it or skip
                })
                .ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User userUpdate)
        {
            if (id != userUpdate.Id)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Update allowed fields
            user.FullName = userUpdate.FullName;
            user.Address = userUpdate.Address;
            // Optionally update password if provided and not empty
            // if (!string.IsNullOrEmpty(userUpdate.PasswordHash)) { ... }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
    }
}
