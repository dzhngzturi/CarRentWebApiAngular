using System.ComponentModel.DataAnnotations;

namespace API.DTO_s
{
    public class CarCreateDto
    {
        [Required]
        public string Name { get; set; }
      
        [Required]
        public int Year { get; set; }

        [Required]
        public string Fuel { get; set; }
       
        [Required]
        [RegularExpression(@"^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$",
          ErrorMessage = "Price must be a decimal (e.g 20.30)")]
        public double Price { get; set; }
        
        [Required]
        public int CarBrandId { get; set; }

        [Required]
        public int CarTypeId { get; set; }

       
    }
}
