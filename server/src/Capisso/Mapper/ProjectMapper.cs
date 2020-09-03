using Capisso.Dto;
using Capisso.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Mapper
{
    public static class ProjectMapper
    {
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
            };
        }
    }
}
