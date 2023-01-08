using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Config
{
    public class CarConfiguration : IEntityTypeConfiguration<Car>
    {
        public void Configure(EntityTypeBuilder<Car> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(150);
            builder.Property(p => p.Year).IsRequired();
            builder.Property(p => p.Fuel).IsRequired().HasMaxLength(20);
            builder.Property(p => p.Price).IsRequired();
            builder.HasOne(b => b.Brand).WithMany().HasForeignKey(p => p.CarBrandId);
            builder.HasOne(b => b.Type).WithMany().HasForeignKey(p => p.CarTypeId);
        }
    }
}
