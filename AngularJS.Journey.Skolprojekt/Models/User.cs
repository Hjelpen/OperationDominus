using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AngularJS.Journey.Skolprojekt.Models
{
    public class User
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Användarnamn")]

        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Lösenordet {0} måste bestå av minst {2} tecken.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Lösenord")]

        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Bekräfta lösenord")]
        [Compare("Password", ErrorMessage = "Lösenorden matchar inte.")]
        public string ConfirmPassword { get; set; }
    }
}