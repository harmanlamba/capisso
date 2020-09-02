using Capisso.Dto;
using Capisso.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Mapper
{
    public static class CourseMapper
    {
        public static Course FromDto(CourseDto courseDto)
        {
            return new Course
            {
                Id = courseDto.Id,
                Name = courseDto.Name,
                Code = courseDto.Code,
                Description = courseDto.Description
            };
        }

        public static CourseDto ToDto(Course course)
        {
            return new CourseDto
            {
                Id = course.Id,
                Name = course.Name,
                Code = course.Code,
                Description = course.Description
            };
        }
    }
}
