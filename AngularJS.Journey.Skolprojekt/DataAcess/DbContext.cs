using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJS.Journey.Skolprojekt.DataAcess
{
    public class DbContext : IdentityDbContext<IdentityUser>
    {
        public DbContext() : base("DbContext")
        {

        }
    }
}