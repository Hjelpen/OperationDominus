namespace AngularJS.Journey.Skolprojekt.Models
{
    public class Trip
    {
        public int TripId { get; set; }
        public string Date { get; set; }
        public int MileageStart { get; set; } 
        public int MileageStop { get; set; }
        public string AdressStart { get; set; }
        public string AdressStop { get; set; }
        public string Erand { get; set; } 
        public string Notes { get; set; }


        public virtual ApplicationUser User { get; set; }
        public virtual Vehicle Vehicle { get; set; }
    }
}