﻿using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace AngularJS.Journey.Skolprojekt.Models
{
    public class Trip
    {
        [Required]
        public int TripId { get; set; }

        [Required]
        public string Vehicle { get; set; }

        [Required]
        public DateTime Date { get; set; }

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

        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }
    }
}