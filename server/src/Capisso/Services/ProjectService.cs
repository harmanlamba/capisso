using Capisso.Dto;
using Capisso.Mapper;
using Capisso.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            await _unitOfWork.ProjectRepository.InsertAsync(project);
            await _unitOfWork.SaveAsync();

            return project.Id;
        }

        public async Task<IEnumerable<ProjectDto>> GetAll()
        {
            var projects = await _unitOfWork.ProjectRepository.GetAllAsync();
            return projects.Select(project => ProjectMapper.ToDto(project));
        }

        public async Task<ProjectDto> GetProjectAsync(int projectId)
        {
            var project = await _unitOfWork.ProjectRepository.GetByIdAsync(projectId) ?? throw new EntityNotFoundException();

            return ProjectMapper.ToDto(project);
        }
    }
}
