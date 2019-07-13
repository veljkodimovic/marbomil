using Marbomil.Infrastructure.Entities.Database;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Repository
{
    public class MarbomilDbContext : IdentityDbContext<User, Role, int, UserLogin, UserRole, UserClaim>
    {
        public MarbomilDbContext() : base(ConfigurationManager.AppSettings["DatabaseName"])
        { }

        public MarbomilDbContext(string dbNameOrConnectionString) : base(dbNameOrConnectionString)
        { }


        IDbSet<Attest> Attests { get; set; }
        IDbSet<Banner> Banners { get; set; }
        IDbSet<Catalogue> Catalogues { get; set; }
        IDbSet<Category> Categories { get; set; }
        IDbSet<Collection> Collections { get; set; }
        IDbSet<Product> Products { get; set; }
        IDbSet<ProductImage> ProductImages { get; set; }
        IDbSet<Sales> Sales { get; set; }
        IDbSet<Service> Services { get; set; }
        IDbSet<Video> Videos { get; set; }
        IDbSet<RefreshToken> RefreshTokens { get; set; }
        IDbSet<Order> Orders { get; set; }
        IDbSet<OrderItem> OrderItems { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }

        public DbContextTransaction OpenTransaction()
        {
            return this.Database.BeginTransaction();
        }
    }
}
