namespace AngularJS.Journey.Skolprojekt.Models
{
    public class Trip
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

        public virtual ApplicationUser User { get; set; }
    }
}