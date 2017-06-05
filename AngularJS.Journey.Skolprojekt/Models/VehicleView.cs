using AngularJS.Journey.Skolprojekt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJS.Journey.Skolprojekt.Views
{
    public class VehicleView
    {

        public int CarId { get; set; }

        public string LicensNumber { get; set; }

        public bool Status { get; set; }

        public VehicleView(Vehicle vehicle)
        {
            CarId = vehicle.CarId;
            LicensNumber = vehicle.LicensNumber;
            Status = vehicle.Status;
        }

    }
}