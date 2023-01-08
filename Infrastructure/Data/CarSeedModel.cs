using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class CarSeedModel
    {
        public string Name { get; set; }
        public int Year { get; set; }
        public string Fuel { get; set; }
        public string PictureUrl { get; set; }
        public double Price { get; set; }
        public int CarTypeId { get; set; }
        public int CarBrandId { get; set; }
    }
}
