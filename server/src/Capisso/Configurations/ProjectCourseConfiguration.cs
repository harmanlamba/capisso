using Capisso.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Capisso.Configurations
{
    public class ProjectCourseConfiguration : IEntityTypeConfiguration<ProjectCourse>
    {
        public void Configure(EntityTypeBuilder<ProjectCourse> builder)
        {
            builder.HasKey(e => new {e.ProjectId, e.CourseId});
            builder
                .HasOne(e => e.Project)
                .WithMany(e => e.ProjectCourses)
                .HasForeignKey(e => e.ProjectId);
            builder
                .HasOne(e => e.Course)
                .WithMany(e => e.ProjectCourses)
                .HasForeignKey(e => e.CourseId);

            builder.HasData(
                new ProjectCourse
                {
                    ProjectId = 1,
                    CourseId = 1,
                },
                new ProjectCourse
                {
                    ProjectId = 1,
                    CourseId = 2,
                },
                new ProjectCourse
                {
                    ProjectId = 2,
                    CourseId = 1,
                },
                new ProjectCourse
                {
                    ProjectId = 3,
                    CourseId = 2,
                },
                new ProjectCourse
                {
                    ProjectId = 4,
                    CourseId = 1,
                }
            );
        }
    }
}