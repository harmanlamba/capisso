using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capisso.Dto;
using Capisso.Entities;
using Capisso.Exceptions;
using Capisso.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Capisso.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,User")]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CoursesController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpPost]
        public async Task<ActionResult<CreatedDto>> CreateCourse([FromBody] CourseDto courseDto)
        {
            int createdId = await _courseService.CreateCourse(courseDto);

            return Created($"/courses/{createdId}", new CreatedDto { Id = createdId }); //TODO: Configure Base Url from configuration
        }

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

        public async Task<ActionResult<IEnumerable<CourseDto>>> GetAllCourses()
        {
            var courses = await _courseService.GetAllCourses();
            return Ok(courses);
        }
    }
}
