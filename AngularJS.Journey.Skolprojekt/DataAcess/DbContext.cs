using AngularJS.Journey.Skolprojekt.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace AngularJS.Journey.Skolprojekt.DataAcess
{
    public class DbContext : IdentityDbContext<ApplicationUser>
    {
        public DbContext() : base("DbContext")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Vehicle>()
           .HasRequired(c => c.User)
           .WithMany(t => t.Vehicles)
           .Map(m => m.MapKey("UserId"));
        }

        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Trip> Trips { get; set; }

    }
}