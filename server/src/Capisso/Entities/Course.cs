using System.Collections.Generic;

namespace Capisso.Entities
{
    public class Course : Entity<int>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public virtual List<ProjectCourse> ProjectCourses { get; set; }
    }
}
