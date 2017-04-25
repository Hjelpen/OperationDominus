using AngularJS.Journey.Skolprojekt.API;
using AngularJS.Journey.Skolprojekt.Models;

namespace AngularJS.Journey.Skolprojekt.Helpers
{
    public class PdfHelper
    {

        public static string GetVehicleTripsPdfUrl(PdfModel pdfModel)
        {

            var vehicleTrips = TripsController.GetVehicleTrips(pdfModel);

            var url = "";
            return url;
        }
   
    }
}