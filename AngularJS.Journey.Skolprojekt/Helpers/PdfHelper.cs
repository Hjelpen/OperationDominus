using System;
using System.Collections.Generic;
using AngularJS.Journey.Skolprojekt.API;
using AngularJS.Journey.Skolprojekt.Models;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;

namespace AngularJS.Journey.Skolprojekt.Helpers
{
    public class PdfHelper
    {

        public string GetVehicleTripsPdfUrl(PdfModel pdfModel)
        {
            var tc = new TripsController();
            var trips = tc.GetVehicleTrips(pdfModel);

            var url = BuildPdfAndReturnUrl(trips);

            return url;

        }

        public string BuildPdfAndReturnUrl(List<Trip> trips)
        {
            var savePath = @"C:\" + Guid.NewGuid().ToString() + ".pdf";
            using (Document doc = new Document(PageSize.A4))
            {
               
                    using (PdfWriter writer = PdfWriter.GetInstance(doc, new FileStream(savePath, FileMode.Create)))
                    {
                        doc.Open();
                        BaseFont baseHelvetica = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
                        var color = BaseColor.BLACK;
                        Font helvetica = new Font(baseHelvetica, 20, Font.BOLD, color);


                        foreach (var trip in trips)
                        {
                            PdfPTable table = new PdfPTable(2);
                            PdfPCell cell = new PdfPCell(new Phrase(trip.Vehicle));
                            cell.Colspan = 2;
                            cell.BackgroundColor = BaseColor.BLUE;

                            cell.HorizontalAlignment = 1;
                            cell.Padding = 5;
                            table.AddCell(cell);

                            table.AddCell("Datum");
                            table.AddCell(trip.Date.ToString());

                            table.AddCell("Mätarställning, start");
                            table.AddCell(trip.MileageStart.ToString());

                            table.AddCell("Mätarställning, ankomst");
                            table.AddCell(trip.MileageStop.ToString());

                            table.AddCell("Reslängd, km");
                            table.AddCell(trip.DistanceTraveled.ToString());

                            table.AddCell("Startadress");
                            table.AddCell(trip.AdressStart.ToString());

                            table.AddCell("Ankomstadress");
                            table.AddCell(trip.AdressStop.ToString());

                            table.AddCell("Ärende");
                            table.AddCell(trip.Erand.ToString());

                            table.AddCell("Anteckningar");
                            table.AddCell(trip.Notes.ToString());
                            table.PaddingTop = 10;
                            table.SpacingAfter = 10;
                            doc.Add(table);
                        }

                        doc.Close();
                    }
                     
                return savePath;
            }
        }
    }
}