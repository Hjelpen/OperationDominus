using AngularJS.Journey.Skolprojekt.Models;
using System.Web.Http;
using AngularJS.Journey.Skolprojekt.Helpers;

namespace AngularJS.Journey.Skolprojekt.API
{
    [Route("api/report")]
    [Authorize]
    public class ReportController : ApiController
    {
        [HttpPost]
        public IHttpActionResult GeneratePdfUrl(PdfModel pdfModel)
        {
            var pdfhelper = new PdfHelper();

            var url = pdfhelper.GetVehicleTripsPdfUrl(pdfModel);
            return Ok(url);
        }

        [HttpPost]
        [Route("api/report/chart")]
        public IHttpActionResult GetChartData(PdfModel pdfModel)
        {

            var tc = new TripsController();
            var trips = tc.GetChartData(pdfModel);

            return Ok(trips);

        }
    }

}