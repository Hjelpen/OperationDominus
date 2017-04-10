using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace AngularJS.Journey.Skolprojekt.Models
{
    public class ApplicationUser : IdentityUser
    {

        public virtual ICollection<Vehicle> Vehicles { get; set; }
        public virtual ICollection<Trip> Trips { get; set; }

    }
}