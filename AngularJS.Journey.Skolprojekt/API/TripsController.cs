using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AngularJS.Journey.Skolprojekt.Models;
using AngularJS.Journey.Skolprojekt.Providers;
using System.Security.Claims;
using AngularJS.Journey.Skolprojekt.Repositories;
using AngularJS.Journey.Skolprojekt.Views;
using AngularJS.Journey.Skolprojekt.Helpers;

namespace AngularJS.Journey.Skolprojekt.API
{
    [Authorize]
    public class TripsController : ApiController
    {
        private DataAcess.DbContext db = DbContextProvider.Instance.DbContext;
        private UserRepository _repo = new UserRepository();

        // GET: api/Trips
        [Authorize]
        public List<TripView> GetTrips()
        {
            var currentUser = GetCurrentUser();

            var trips = db.Trips.Where(x => x.User.Id == currentUser.Id).ToList();
            var views = new List<TripView>();
            foreach (Trip t in trips)
            {
                views.Add(new TripView(t));
            }
            return views;
        }

        private ApplicationUser GetCurrentUser()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var userName = principal.Claims.Where(c => c.Type == "user_name").Single().Value;
            var currentUser = _repo.GetUserByUserName(userName);
            return currentUser;
        }

        // GET: api/Trips/5
        [ResponseType(typeof(Trip))]
        public IHttpActionResult GetTrip(int id)
        {
            Trip trip = db.Trips.Find(id);
            if (trip == null)
            {
                return NotFound();
            }

            return Ok(trip);
        }

        // PUT: api/Trips/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTrip(int id, Trip trip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trip.TripId)
            {
                return BadRequest();
            }

            db.Entry(trip).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TripExists(id))
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

        // POST: api/Trips
        [ResponseType(typeof(Trip))]
        [Authorize]
        public IHttpActionResult PostTrip(Trip trip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentUser = GetCurrentUser();
            trip.User = currentUser;

            db.Trips.Add(trip);
            db.SaveChanges();

            return Ok();
        }

        // DELETE: api/Trips/5
        [ResponseType(typeof(Trip))]
        public IHttpActionResult DeleteTrip(int id)
        {
            Trip trip = db.Trips.Find(id);
            if (trip == null)
            {
                return NotFound();
            }

            db.Trips.Remove(trip);
            db.SaveChanges();

            return Ok(trip);
        }

        public static List<Trip> GetVehicleTrips(PdfModel pdfmodel)
        {

            return db.Trips.Where(x => x.Vehicle == pdfmodel.vehicle && x.Date >= pdfmodel.Date1 && x.Date <= pdfmodel.Date2).ToList();
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

        private bool TripExists(int id)
        {
            return db.Trips.Count(e => e.TripId == id) > 0;
        }
    }
}