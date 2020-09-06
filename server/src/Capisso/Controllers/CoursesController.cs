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
        [Route("{id:int}")]
        public async Task<ActionResult> UpdateCourse([FromBody] CourseDto courseDto, [FromRoute] int id)
        {
            if (courseDto.Id != id)
            {
                return BadRequest();
            }

            try
            {
                await _courseService.UpdateCourse(courseDto);
            }
            catch (EntityNotFoundException)
            {
                return BadRequest();
            }

            return NoContent();
        }

    }
}
