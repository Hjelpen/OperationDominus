using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using AngularJS.Journey.Skolprojekt.DataAcess;
using AngularJS.Journey.Skolprojekt.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using AngularJS.Journey.Skolprojekt.Repositories;
using System.Net.Http;
using AngularJS.Journey.Skolprojekt.Providers;
using System.Collections.Generic;
using AngularJS.Journey.Skolprojekt.Views;

namespace AngularJS.Journey.Skolprojekt.API
{
    [Authorize]
    public class VehiclesController : ApiController
    {
        private DbContext db;
        private UserManager<IdentityUser> manager;
        private UserRepository _repo;

        public VehiclesController()
        {
            db = DbContextProvider.Instance.DbContext;
            manager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(db));
            _repo = new UserRepository();
        }

        private ApplicationUser GetCurrentUser()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var userName = principal.Claims.Where(c => c.Type == "user_name").Single().Value;
            var currentUser = _repo.GetUserByUserName(userName);
            return currentUser;
        }

        // GET: api/Vehicles
        [Authorize]
        public List<VehicleView> GetVehicles()
        {
            var currentUser = GetCurrentUser();

            var vehicles = db.Vehicles.Where(x => x.User.Id == currentUser.Id).ToList();
            var views = new List<VehicleView>();
            foreach (Vehicle v in vehicles)
            {
                views.Add(new Views.VehicleView(v));
            }
            return views;
        }

        // GET: api/Vehicles/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(int id)
        {
            Vehicle vehicle = db.Vehicles.Find(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        // PUT: api/Vehicles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(int Id)
        {

            Vehicle vehicle = db.Vehicles.Find(Id);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (Id != vehicle.CarId)
            {
                return BadRequest();
            }
            if (vehicle.Status == true)
            {
                vehicle.Status = false;
            }
            else
            {
                vehicle.Status = true;
            }

            db.Entry(vehicle).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Vehicles
        [Authorize]
        public IHttpActionResult PostVehicle(Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentUser = GetCurrentUser();
            vehicle.User = currentUser;

            db.Vehicles.Add(vehicle);
            db.SaveChanges();

            return Ok();
        }

        // DELETE: api/Vehicles/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult DeleteVehicle(int Id)
        {
            Vehicle vehicle = db.Vehicles.Find(Id);
            if (vehicle == null)
            {
                return NotFound();
            }

            db.Vehicles.Remove(vehicle);
            db.SaveChanges();

            return Ok(vehicle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                DbContextProvider.Instance.DisposeContext();
                db = null;
            }
            base.Dispose(disposing);
        }

        private bool VehicleExists(int id)
        {
            return db.Vehicles.Count(e => e.CarId == id) > 0;
        }
    }
}