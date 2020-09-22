using Capisso.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Capisso.Configurations
{
    public class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name).IsRequired();
            builder.Property(e => e.Code).IsRequired();
            builder.Property(e => e.Description).IsRequired();

            builder.HasData(
                new Course
                {
                    Id = 1,
                    Name = "Advanced Agile and Lean Software Development",
                    Code = "SOFTENG 761",
                    Description = "Learn how to use the agile software methodology."
                },
                new Course
                {
                    Id = 2,
                    Name = "Robotic Process Automation",
                    Code = "SOFTENG 762",
                    Description = "Learn how to automate processes robitically."
                }
            );
        }
    }
}