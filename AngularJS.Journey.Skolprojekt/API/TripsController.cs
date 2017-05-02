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


        public List<Trip> GetVehicleTrips(PdfModel pdfModel)
        {
            return db.Trips.Where(x => x.Vehicle == pdfModel.Vehicle && x.Date >= pdfModel.Date1 && x.Date <= pdfModel.Date2).ToList();
        }

        public List<Trip>GetChartData(PdfModel pdfModel)
        {
            return db.Trips.Where(x => x.Vehicle == pdfModel.Vehicle && x.Date >= pdfModel.Date1 && x.Date <= pdfModel.Date2).ToList();
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