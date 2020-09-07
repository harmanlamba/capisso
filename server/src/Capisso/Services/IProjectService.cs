using Capisso.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAllProjects(int? organisationId);
        Task<int> CreateProject(ProjectDto projectDto);
        Task<ProjectDto> GetProject(int projectId);
        Task<bool> UpdateProject(ProjectDto projectDto);
    }
}
