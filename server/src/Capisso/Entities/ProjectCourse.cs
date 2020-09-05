using System.ComponentModel.DataAnnotations.Schema;

namespace Capisso.Entities
{
    public class ProjectCourseKey
    {
        public int ProjectId { get; set; }
        public int CourseId { get; set; }
    }

    /// <summary>
    /// ProjectCourse represents a join table for the many to many relationship, Project Course.
    /// </summary>
    public class ProjectCourse : Entity<ProjectCourseKey>
    {
        // composite key, mapped using anonymous type in CapissoContext
        [NotMapped] public override ProjectCourseKey Id { get; set; }
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        public int CourseId { get; set; }
        public virtual Course Course { get; set; }
    }
}