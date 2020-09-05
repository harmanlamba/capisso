namespace Capisso.Entities
{
    /// <summary>
    /// ProjectCourse represents a join table for the many to many relationship, Project Course.
    /// </summary>
    public class ProjectCourse : Entity<int>
    {
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        public int CourseId { get; set; }
        public virtual Course Course { get; set; }
    }
}