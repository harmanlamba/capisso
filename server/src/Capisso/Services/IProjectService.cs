using Capisso.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Services
{
    public interface IProjectService
    {
        Task<int> CreateProject(ProjectDto projectDto);
        Task<ProjectDto> GetProject(int projectId);
        Task UpdateProject(ProjectDto projectDto);
    }
}
