using Capisso.Dto;
using Capisso.Mapper;
using Capisso.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Services
{
    public class CourseService : ICourseService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CourseService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<int> CreateCourse(CourseDto courseDto)
        {
            var course = CourseMapper.FromDto(courseDto);
            await _unitOfWork.CourseRepository.InsertAsync(course);
            await _unitOfWork.SaveAsync();

            return course.Id;
        }
    }
}
