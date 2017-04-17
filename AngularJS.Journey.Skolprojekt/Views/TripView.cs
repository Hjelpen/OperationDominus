using AngularJS.Journey.Skolprojekt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJS.Journey.Skolprojekt.Views
{
    public class TripView
    {

        public int TripId { get; set; }
        public string Vehicle { get; set; }
        public string Date { get; set; }
        public decimal MileageStart { get; set; }
        public decimal MileageStop { get; set; }
        public decimal DistanceTraveled { get; set; }
        public string AdressStart { get; set; }
        public string AdressStop { get; set; }
        public string Erand { get; set; }
        public string Notes { get; set; }

        public TripView(Trip trip)
        {
            TripId = trip.TripId;
            Vehicle = trip.Vehicle;
            Date = trip.Date;
            MileageStart = trip.MileageStart;
            MileageStop = trip.MileageStop;
            DistanceTraveled = trip.DistanceTraveled;
            AdressStart = trip.AdressStart;
            AdressStop = trip.AdressStop;
            Erand = trip.Erand;
            Notes = trip.Notes;
        }

    }
}