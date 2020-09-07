using Capisso.Dto;
using Capisso.Mapper;
using Capisso.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capisso.Entities;

namespace Capisso.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<int> CreateProject(ProjectDto projectDto)
        {
            var project = ProjectMapper.FromDto(projectDto);

            // populate organisation
            project.Organisation = await _unitOfWork.OrganisationRepository.GetByIdAsync(projectDto.OrganisationId);
            if (project.Organisation == null)
            {
                throw new EntityNotFoundException($"organisation with id <{projectDto.OrganisationId}> not found");
            }

            // create project course links
            var projectCourses = await Task.WhenAll(projectDto.CourseIds.Select(async courseId =>
            {
                var course = await _unitOfWork.CourseRepository.GetByIdAsync(courseId);
                if (course == null)
                {
                    throw new EntityNotFoundException($"course with id <{courseId}> not found");
                }

                return new ProjectCourse
                {
                    Project = project,
                    Course = course,
                    CourseId = courseId,
                };
            }));
            project.ProjectCourses = projectCourses.ToList();

            await _unitOfWork.ProjectRepository.InsertAsync(project);
            await _unitOfWork.SaveAsync();

            return project.Id;
        }

        public async Task<IEnumerable<ProjectDto>> GetAllProjects(int? organisationId = null)
        {
            var projects = organisationId == null ?
                await _unitOfWork.ProjectRepository.GetAllAsync() :
                await _unitOfWork.ProjectRepository.FindByAsync(p => p.OrganisationId == organisationId);

            return projects.Select(ProjectMapper.ToDto);
        }

        public async Task<ProjectDto> GetProject(int projectId)
        {
            var project = await _unitOfWork.ProjectRepository.GetByIdAsync(projectId) ??
                          throw new EntityNotFoundException();

            return ProjectMapper.ToDto(project);
        }

        public async Task<bool> UpdateProject(ProjectDto projectDto)
        {
            var project = ProjectMapper.FromDto(projectDto);

            // populate organisation
            project.Organisation = await _unitOfWork.OrganisationRepository.GetByIdAsync(projectDto.OrganisationId);
            if (project.Organisation == null)
            {
                throw new EntityNotFoundException($"organisation with id <{projectDto.OrganisationId}> not found");
            }

            // update and reinsert join table records
            var existingProjectCourses =
                await _unitOfWork.ProjectCourseRepository
                    .FindByAsync(pc => pc.ProjectId == project.Id);

            foreach (var projectCourse in existingProjectCourses)
            {
                _unitOfWork.ProjectCourseRepository.Delete(projectCourse);
            }

            // create project course links
            var newProjectCourses = new List<ProjectCourse>();

            foreach (var courseId in projectDto.CourseIds)
            {
                var course = await _unitOfWork.CourseRepository.GetByIdAsync(courseId);
                if (course == null)
                {
                    throw new EntityNotFoundException($"course with id <{courseId}> not found");
                }

                newProjectCourses.Add(new ProjectCourse
                {
                    Project = project,
                    Course = course,
                    CourseId = courseId,
                });
            }

            project.ProjectCourses = newProjectCourses;

            _unitOfWork.ProjectRepository.Update(project);
            await _unitOfWork.SaveAsync();

            return true;
        }
    }
}