using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "Customer"; // "Admin", "Customer"
        public string? FullName { get; set; }
        public string? Address { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty; // e.g. "Living Room", "Office"
        public string Material { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Pending"; // "Pending", "Processing", "Shipped", "Completed"
        public string? ShippingAddress { get; set; }
        public string? ShippingName { get; set; } // Added
        public string? PaymentMethod { get; set; } // Added
        public string? TrackingNumber { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }

    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public Order? Order { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; } // Snapshot price at time of order
    }

    public class Wishlist
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public List<WishlistItem> WishlistItems { get; set; } = new List<WishlistItem>();
    }

    public class WishlistItem
    {
        public int Id { get; set; }
        public int WishlistId { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public Wishlist? Wishlist { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    }
}
