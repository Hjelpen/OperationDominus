using System.ComponentModel.DataAnnotations;

namespace AngularJS.Journey.Skolprojekt.Models
{
    public class Trip
    {
        [Required]
        public int TripId { get; set; }

        public string Vehicle { get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        public decimal MileageStart { get; set; }

        [Required]
        public decimal MileageStop { get; set; }

        [Required]
        public decimal DistanceTraveled { get; set; }

        [Required]
        public string AdressStart { get; set; }

        [Required]
        public string AdressStop { get; set; }

        [Required]
        public string Erand { get; set; } 

        public string Notes { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}