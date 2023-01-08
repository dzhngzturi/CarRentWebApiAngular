using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Photo : BaseEntity
    {
        public string PictureUrl { get; set; }
        public string FileName { get; set; }
        public bool IsMain { get; set; }
        public Car Car { get; set; }
        public int CarId { get; set; }
    }
}
