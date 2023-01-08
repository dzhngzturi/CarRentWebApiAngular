using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class CarItemOrdered
    {
        public CarItemOrdered()
        {
        }

        public CarItemOrdered(int carItemId, string carName, string pictureUrl
            )
        {
            CarItemId = carItemId;
            CarName = carName;
            PictureUrl = pictureUrl;
           
        }

        public int CarItemId { get; set; }
        public string CarName { get; set; }
        public string PictureUrl { get; set; }


    }
}
