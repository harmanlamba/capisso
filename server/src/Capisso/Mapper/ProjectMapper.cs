using Capisso.Dto;
using Capisso.Entities;
using System.Linq;
using System.Threading.Tasks;
using Capisso.Repository;

namespace Capisso.Mapper
{
    public static class ProjectMapper
    {
        public static async Task<Project> FromDto(ProjectDto projectDto, IUnitOfWork unitOfWork)
        {
            var courses = await unitOfWork.CourseRepository
                .FindByAsync(c => projectDto.CourseIds.Contains(c.Id));
            var organisation = await unitOfWork.OrganisationRepository.GetByIdAsync(projectDto.OrganisationId);

            var project = new Project
            {
                Id = projectDto.Id,
                Title = projectDto.Title,
                Notes = projectDto.Notes,
                Outcome = projectDto.Outcome,
                StartDate = projectDto.StartDate,
                EndDate = projectDto.EndDate,
                Organisation = organisation,
            };

            project.ProjectCourses = courses.Select(course => new ProjectCourse
            {
                Course = course,
                CourseId = course.Id,
                Project = project,
                ProjectId = project.Id
            }).ToList();

            return project;
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