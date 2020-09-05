using Capisso.Entities;
using Microsoft.EntityFrameworkCore;

namespace Capisso.Repository
{
    public class ProjectCourseRepository : GenericRepository<ProjectCourse>, IProjectCourseRepository
    {
        public ProjectCourseRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}