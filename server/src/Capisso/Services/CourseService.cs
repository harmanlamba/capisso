﻿using Capisso.Dto;
using Capisso.Entities;
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
            var course = courseDto.FromDto();
            await _unitOfWork.CourseRepository.InsertAsync(course);
            await _unitOfWork.SaveAsync();

            return course.Id;
        }

        public async Task<CourseDto> GetCourse(int id)
        {
            var course = await _unitOfWork.CourseRepository.GetByIdAsync(id) ??
                throw new EntityNotFoundException();

            return course.ToDto();
        }

        public async Task UpdateCourse(CourseDto courseDto)
        {
            var course = courseDto.FromDto();

            if (!await _unitOfWork.CourseRepository.Contains(course))
            {
                throw new EntityNotFoundException();
            }

            _unitOfWork.CourseRepository.Update(course);
            await _unitOfWork.SaveAsync();
        }
    }
}
