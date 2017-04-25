using AngularJS.Journey.Skolprojekt.Models;
using System.Web.Http;
using AngularJS.Journey.Skolprojekt.Helpers;

namespace AngularJS.Journey.Skolprojekt.API
{
    [Route("api/report")]
    [Authorize]
    public class PdfController : ApiController
    {
        [HttpPost]
        public IHttpActionResult GeneratePdfUrl(PdfModel pdfModel)
        {
            var pdfhelper = new PdfHelper();

            var url = pdfhelper.GetVehicleTripsPdfUrl(pdfModel);
            return Ok(url);
        }
    }

}