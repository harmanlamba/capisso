using System;
using System.Threading.Tasks;
using Capisso.Entities;
using Microsoft.EntityFrameworkCore;

namespace Capisso.Repository
{
    public class ProjectCourseRepository : GenericRepository<ProjectCourse>, IProjectCourseRepository
    {
        public ProjectCourseRepository(DbContext dbContext) : base(dbContext)
        {
        }

        public override async Task<ProjectCourse> GetByIdAsync(object id)
        {
            if (!(id is ProjectCourseKey projectCourseKey))
            {
                throw new ArgumentException("Id of ProjectCourse must be of type ProjectCourseKey");
            }

            return await _dbSet.FindAsync(projectCourseKey.ProjectId, projectCourseKey.CourseId);
        }
    }
}