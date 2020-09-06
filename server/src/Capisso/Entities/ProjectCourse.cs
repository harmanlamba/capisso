using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Capisso.Entities
{
    public class ProjectCourseKey
    {
        public int ProjectId { get; set; }
        public int CourseId { get; set; }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != GetType()) return false;
            var other = (ProjectCourse)obj;
            return ProjectId == other.ProjectId && CourseId == other.CourseId;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(ProjectId, CourseId);
        }
    }

    /// <summary>
    /// ProjectCourse represents a join table for the many to many relationship, Project Course.
    /// </summary>
    public class ProjectCourse : Entity<ProjectCourseKey>
    {
        // composite key, mapped using anonymous type in CapissoContext
        [NotMapped]
        public override ProjectCourseKey Id
        {
            get => new ProjectCourseKey { ProjectId = ProjectId, CourseId = CourseId };
            set
            {
                ProjectId = value.CourseId;
                CourseId = value.CourseId;
            }
        }

        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        public int CourseId { get; set; }
        public virtual Course Course { get; set; }
    }
}