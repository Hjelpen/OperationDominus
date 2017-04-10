using AngularJS.Journey.Skolprojekt.DataAcess;
using AngularJS.Journey.Skolprojekt.Models;
using AngularJS.Journey.Skolprojekt.Providers;
using AngularJS.Journey.Skolprojekt.Repositories;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AngularJS.Journey.Skolprojekt.API
{
    public class VehicleController : ApiController
    {
        private DbContext _ctx = new DbContext();

        protected UserManager<ApplicationUser> UserManager { get; set; }

        private UserRepository _repo = new UserRepository();


        public IEnumerable<Vehicle> Get()
        {
            var vehicles = _ctx.Vehicles;
            return vehicles;
        }

        public Vehicle Get(int id)
        {
            return _ctx.Vehicles.FirstOrDefault(x => x.CarId == id);
        }

        [HttpPost]
        public string Post(Vehicle vehicle)
        {

            _ctx.Vehicles.Add(vehicle);
            _ctx.SaveChanges();

            return string.Format("{0}", vehicle.LicensNumber);
        }

        [HttpPost]
        public void Delete(int id)
        {
            var vehicle = _ctx.Vehicles.Find(id);
            _ctx.Vehicles.Remove(vehicle);
            _ctx.SaveChanges();
       }
    }
}
