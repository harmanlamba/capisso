using Capisso.Dto;
using Capisso.Entities;
using System.Linq;

namespace Capisso.Mapper
{
    public static class ProjectMapper
    {
        /// <summary>
        /// FromDto maps a Dto Project to an Entity.
        /// Warning: It does not populate references
        /// </summary>
        /// <param name="projectDto"></param>
        /// <returns></returns>
        public static Project FromDto(ProjectDto projectDto)
        {
            return new Project
            {
                Id = projectDto.Id,
                Title = projectDto.Title,
                Notes = projectDto.Notes,
                Outcome = projectDto.Outcome,
                StartDate = projectDto.StartDate,
                EndDate = projectDto.EndDate,
            };
        }

        public static ProjectDto ToDto(Project project)
        {
            return new ProjectDto
            {
                Id = project.Id,
                Title = project.Title,
                Notes = project.Notes,
                Outcome = project.Outcome,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                CourseIds = project.ProjectCourses.Select(pc => pc.CourseId),
                OrganisationId = project.OrganisationId
            };
        }
    }
}