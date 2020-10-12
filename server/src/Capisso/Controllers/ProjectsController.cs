using System.Collections.Generic;
using System.Threading.Tasks;
using Capisso.Dto;
using Capisso.Exceptions;
using Capisso.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Capisso.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,User")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        /// <summary>
        /// Gets a list of all projects, optionally filtered by organisation id and course id.
        /// </summary>
        /// <param name="organisationId">If present, only projects from this organisation will be returned.</param>
        /// <param name="courseId">If present, only projects relating to this course will be returned.</param>
        /// <returns>
        /// An Ok response in the case that the request was successful, with the body containing
        /// the list of all filtered projects.
        /// </returns>
        [HttpGet]
        public async Task<IEnumerable<ProjectDto>> GetAllProjects([FromQuery] int? organisationId = null, [FromQuery] int? courseId = null)
        {
            return await _projectService.GetAllProjects(organisationId, courseId);
        }

        /// <summary>
        /// Creates a project from the data in the given projectDto object.
        /// </summary>
        /// <param name="projectDto">Contains the data for the project to be created.</param>
        /// <returns>
        /// A Created response in the case of the request being successful, where the URI in the location header 
        /// is the location of the newly created project, and in the body the id of the created project is returned.
        /// </returns>
        [HttpPost]
        public async Task<ActionResult<CreatedDto>> CreateProject([FromBody] ProjectDto projectDto)
        {
            int createdId = await _projectService.CreateProject(projectDto);
            return Created($"/projects/{createdId}", new CreatedDto { Id = createdId }); //TODO: Configure Base Url from configuration
        }

        /// <summary>
        /// Gets a single project with the given id.
        /// </summary>
        /// <param name="id">The id of the project to be retrieved.</param>
        /// <returns>
        /// An Ok response in the case of the request being successful, and the project data in the body.
        /// A NotFound response in the case that no project matching the given id was found.
        /// </returns>
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

        /// <summary>
        /// Updates the project with the given id, with the data in the given projectDto.
        /// </summary>
        /// <param name="projectDto">Contains the new data to update the project with.</param>
        /// <param name="projectId">The id of the project to be updated</param>
        /// <returns>
        /// A NoContent response in the case that the update was successful.
        /// A BadRequest response in the case that the given project ids do not match.
        /// </returns>
        [HttpPut("{projectId:int}")]
        public async Task<ActionResult> UpdateProject([FromBody] ProjectDto projectDto, [FromRoute] int projectId)
        {
            if (projectDto.Id != projectId)
            {
                return BadRequest();
            }

            try
            {
                await _projectService.UpdateProject(projectDto);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
