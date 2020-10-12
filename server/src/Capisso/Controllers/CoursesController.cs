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
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CoursesController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        /// <summary>
        /// Creates a course from the data in the given courseDto object.
        /// </summary>
        /// <param name="courseDto">Contains the data for the course to be created.</param>
        /// <returns>
        /// A Created response in the case of the request being successful, where the URI in the location header 
        /// is the location of the newly created course, and in the body the id of the created course is returned.
        /// </returns>
        [HttpPost]
        public async Task<ActionResult<CreatedDto>> CreateCourse([FromBody] CourseDto courseDto)
        {
            int createdId = await _courseService.CreateCourse(courseDto);

            return Created($"/courses/{createdId}", new CreatedDto { Id = createdId }); //TODO: Configure Base Url from configuration
        }

        /// <summary>
        /// Gets a single course with the given id.
        /// </summary>
        /// <param name="id">The id of the course to be retrieved.</param>
        /// <returns>
        /// An Ok response in the case of the request being successful, and the course data in the body.
        /// A NotFound response in the case that no course matching the given id was found.
        /// </returns>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<CourseDto>> GetCourse(int id)
        {
            CourseDto courseDto;
            try
            {
                courseDto = await _courseService.GetCourse(id);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }

            return Ok(courseDto);
        }

        /// <summary>
        /// Updates the course with the given id, with the data in the given courseDto.
        /// </summary>
        /// <param name="courseDto">Contains the new data to update the course with.</param>
        /// <param name="courseId">The id of the course to be updated.</param>
        /// <returns>
        /// A NoContent response in the case that the update was successful.
        /// A BadRequest response in the case that the given course ids do not match.
        /// </returns>
        [HttpPut]
        [Route("{courseId}")]
        public async Task<ActionResult> UpdateCourse([FromBody] CourseDto courseDto, [FromRoute] int courseId)
        {
            if (courseDto.Id != courseId)
            {
                return BadRequest();
            }

            await _courseService.UpdateCourse(courseDto);
            return NoContent();
        }

        /// <summary>
        /// Gets a list of all courses.
        /// </summary>
        /// <returns>
        /// An Ok response in the case that the request was successful, with the body containing
        /// the list of all courses.
        /// </returns>
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetAllCourses()
        {
            var courses = await _courseService.GetAllCourses();
            return Ok(courses);
        }
    }
}
