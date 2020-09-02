﻿using System;
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

    }
}
