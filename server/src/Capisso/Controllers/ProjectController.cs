using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capisso.Dto;
using Capisso.Entities;
using Capisso.Services;
using Microsoft.AspNetCore.Mvc;

namespace Capisso.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpPost]
        public async Task<ActionResult<CreatedDto>> CreateProject([FromBody] ProjectDto projectDto)
        {
            int createdId = await _projectService.CreateProject(projectDto);
            return Created($"/projects/{createdId}", new CreatedDto { Id = createdId }); //TODO: Configure Base Url from configuration
        }

    }
}
