using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class CarWithBrandsAndTypesSpecification : BaseSpecifiation<Car>
    {
        public CarWithBrandsAndTypesSpecification(CarSpecParams carParams)
            : base(x => 
            (string.IsNullOrEmpty(carParams.Search) || x.Name.ToLower().Contains(carParams.Search)) &&
            (!carParams.BrandId.HasValue || x.CarBrandId == carParams.BrandId) && 
            (!carParams.TypeId.HasValue || x.CarTypeId == carParams.TypeId))
        {
            AddInclude(x => x.Brand);
            AddInclude(x => x.Type);
            AddInclude(x => x.Photos);
            AddOrderBy(x => x.Name);
            ApplyPaging(carParams.PageSize * (carParams.PageIndex - 1), carParams.PageSize);
            if (!string.IsNullOrEmpty(carParams.Sort))
            {
                switch (carParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(x => x.Price);
                        break;

                    case "priceDesc":
                        AddOrderByDescennding(x => x.Price);
                        break;

                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public CarWithBrandsAndTypesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Brand);
            AddInclude(x => x.Type);
            AddInclude(x => x.Photos);
        }
    }
}
