using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class CarWithFiltersForCountSpecification : BaseSpecifiation<Car>
    {
        public CarWithFiltersForCountSpecification(CarSpecParams carParams)
            :base(x =>
            (string.IsNullOrEmpty(carParams.Search) || x.Name.ToLower().Contains(carParams.Search)) &&
            (!carParams.BrandId.HasValue || x.CarBrandId == carParams.BrandId) && 
            (!carParams.TypeId.HasValue || x.CarTypeId == carParams.TypeId))
        {

        }
    }
}
