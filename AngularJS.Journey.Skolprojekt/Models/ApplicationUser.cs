using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJS.Journey.Skolprojekt.Models
{
    public class ApplicationUser : IdentityUser
    {

        public virtual ICollection<Vehicle> Vehicles { get; set; }
        public virtual ICollection<Trip> Trips { get; set; }
    }
}