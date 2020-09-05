using Capisso.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Services
{
    public interface ICourseService
    {
        Task<int> CreateCourse(CourseDto courseDto);
        Task<CourseDto> GetCourse(int id);
        Task UpdateCourse(CourseDto courseDto);
        Task<IEnumerable<CourseDto>> GetAllCourses();
    }
}
