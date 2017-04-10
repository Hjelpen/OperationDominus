using AngularJS.Journey.Skolprojekt.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AngularJS.Journey.Skolprojekt.DataAcess
{
    public class DbContext : IdentityDbContext<IdentityUser>
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