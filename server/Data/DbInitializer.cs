using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            // Quick fix: Ensure new columns exist (since we skipped migrations for speed)
            try
            {
                context.Database.ExecuteSqlRaw(@"
                    IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = N'ShippingName' AND Object_ID = Object_ID(N'Orders'))
                    BEGIN
                        ALTER TABLE Orders ADD ShippingName NVARCHAR(MAX) NULL;
                    END
                    IF NOT EXISTS(SELECT 1 FROM sys.columns WHERE Name = N'PaymentMethod' AND Object_ID = Object_ID(N'Orders'))
                    BEGIN
                        ALTER TABLE Orders ADD PaymentMethod NVARCHAR(MAX) NULL;
                    END

                    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Wishlists]') AND type in (N'U'))
                    BEGIN
                        CREATE TABLE [dbo].[Wishlists](
                            [Id] [int] IDENTITY(1,1) NOT NULL,
                            [UserId] [int] NOT NULL,
                            CONSTRAINT [PK_Wishlists] PRIMARY KEY CLUSTERED ([Id] ASC)
                        );
                        ALTER TABLE [dbo].[Wishlists]  WITH CHECK ADD  CONSTRAINT [FK_Wishlists_Users_UserId] FOREIGN KEY([UserId])
                        REFERENCES [dbo].[Users] ([Id])
                        ON DELETE CASCADE;
                    END

                    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[WishlistItems]') AND type in (N'U'))
                    BEGIN
                        CREATE TABLE [dbo].[WishlistItems](
                            [Id] [int] IDENTITY(1,1) NOT NULL,
                            [WishlistId] [int] NOT NULL,
                            [ProductId] [int] NOT NULL,
                            [AddedAt] [datetime2](7) NOT NULL,
                            CONSTRAINT [PK_WishlistItems] PRIMARY KEY CLUSTERED ([Id] ASC)
                        );
                        ALTER TABLE [dbo].[WishlistItems]  WITH CHECK ADD  CONSTRAINT [FK_WishlistItems_Products_ProductId] FOREIGN KEY([ProductId])
                        REFERENCES [dbo].[Products] ([Id])
                        ON DELETE CASCADE;
                        ALTER TABLE [dbo].[WishlistItems]  WITH CHECK ADD  CONSTRAINT [FK_WishlistItems_Wishlists_WishlistId] FOREIGN KEY([WishlistId])
                        REFERENCES [dbo].[Wishlists] ([Id])
                        ON DELETE CASCADE;
                    END
                ");
            }
            catch (Exception ex)
            {
                // Ignore if it fails, likely already exists or permissions issue
                Console.WriteLine("Schema update skipped: " + ex.Message);
            }

            // Seed Admin User
            if (!context.Users.Any(u => u.Role == "Admin"))
            {
                var admin = new User
                {
                    Username = "admin",
                    PasswordHash = "admin123", // Simple password for dev
                    Role = "Admin",
                    FullName = "Administrator",
                    Address = "HQ"
                };
                context.Users.Add(admin);
                context.SaveChanges();
            }

            // Look for any products.
            if (context.Products.Any())
            {
                return;   // DB has been seeded with products
            }

            var products = new Product[]
            {
                new Product
                {
                    Name = "Persian Silk Masterpiece",
                    Description = "A stunning hand-knotted Persian rug made from 100% pure silk. Features intricate floral patterns and a high knot count for exceptional durability and softness. Origin: Qom, Iran.",
                    Price = 15000000,
                    Category = "Luxury",
                    Stock = 5,
                    ImageUrl = "https://images.unsplash.com/photo-1545063914-a1a6kcfa?q=80&w=1000&auto=format&fit=crop",
                    Material = "100% Pure Silk"
                },
                new Product
                {
                    Name = "Minimalist Wool Runner",
                    Description = "Perfect for modern hallways, this wool runner features a clean, geometric design. Hand-tufted for a plush feel underfoot. Easy to clean and durable.",
                    Price = 3500000,
                    Category = "Modern",
                    Stock = 12,
                    ImageUrl = "https://images.unsplash.com/photo-1596238612148-52ed20150d03?q=80&w=300&auto=format&fit=crop",
                    Material = "New Zealand Wool"
                },
                new Product
                {
                    Name = "Boho Chic Area Rug",
                    Description = "Add a touch of bohemian flair to your living room with this colorful, textured rug. Made from a blend of wool and cotton, it features tassels and a distressed look.",
                    Price = 4200000,
                    Category = "Bohemian",
                    Stock = 8,
                    ImageUrl = "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=300&auto=format&fit=crop",
                    Material = "Wool & Cotton Blend"
                },
                new Product
                {
                    Name = "Vintage Turkish Kilim",
                    Description = "An authentic vintage Kilim rug from Anatolia. Flat-woven with geometric motifs, this unique piece adds history and character to any space. Approx. 50 years old.",
                    Price = 8900000,
                    Category = "Vintage",
                    Stock = 1,
                    ImageUrl = "https://images.unsplash.com/photo-1596238622151-578964e7c768?q=80&w=2000&auto=format&fit=crop",
                    Material = "100% Wool"
                },
                 new Product
                {
                    Name = "Abstract Art Tufted",
                    Description = "A contemporary masterpiece for your floor. This hand-tufted rug features bold, abstract shapes and vibrant colors. Made from high-quality acrylic for vibrant, long-lasting color.",
                    Price = 6100000,
                    Category = "Modern",
                    Stock = 7,
                    ImageUrl = "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2000&auto=format&fit=crop",
                    Material = "Acrylic"
                },
                new Product
                {
                    Name = "Natural Jute Woven",
                    Description = "Eco-friendly and stylish, this natural jute rug adds texture and warmth. Hand-woven with a chunky loop texture, perfect for coastal or farmhouse interiors.",
                    Price = 2100000,
                    Category = "Natural",
                    Stock = 20,
                    ImageUrl = "https://images.unsplash.com/photo-1594951471378-0cf2e2691238?q=80&w=2000&auto=format&fit=crop",
                    Material = "100% Jute"
                }
            };

            foreach (Product p in products)
            {
                context.Products.Add(p);
            }
            context.SaveChanges();
        }
    }
}
