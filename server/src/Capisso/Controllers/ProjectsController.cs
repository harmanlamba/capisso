using System.Collections.Generic;
using System.Threading.Tasks;
using Capisso.Dto;
using Capisso.Exceptions;
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

        [HttpGet]
        public async Task<IEnumerable<ProjectDto>> GetAllProjects([FromQuery] int? organisationId = null)
        {
            return await _projectService.GetAllProjects(organisationId);
        }

        [HttpPost]
        public async Task<ActionResult<CreatedDto>> CreateProject([FromBody] ProjectDto projectDto)
        {
            int createdId = await _projectService.CreateProject(projectDto);
            return Created($"/projects/{createdId}", new CreatedDto { Id = createdId }); //TODO: Configure Base Url from configuration
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProjectDto>> GetProject(int id)
        {
            ProjectDto projectDto;
            try
            {
                projectDto = await _projectService.GetProject(id);

            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }

            return Ok(projectDto);
        }

        [HttpPut("{projectId:int}")]
        public async Task<ActionResult> UpdateProject([FromBody] ProjectDto projectDto, [FromRoute] int projectId)
        {
            if (projectDto.Id != projectId)
            {
                return BadRequest();
            }

            await _projectService.UpdateProject(projectDto);
            return NoContent();
        }
    }
}
