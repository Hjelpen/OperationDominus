using System.ComponentModel.DataAnnotations;

namespace AngularJS.Journey.Skolprojekt.Models
{
    public class Vehicle
    {
        [Key]
        public int CarId { get; set; }

        public string LicensNumber { get; set;}

        public bool Status { get; set; }
        public virtual ApplicationUser User { get; set; }

    }
}