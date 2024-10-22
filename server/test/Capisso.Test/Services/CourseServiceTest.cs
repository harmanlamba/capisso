﻿using Capisso.Dto;
using Capisso.Entities;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Test.Services
{
    public class CourseServiceTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<ICourseRepository> _mockCourseRepository;
        private CourseService _courseService;

        [SetUp]
        public void Setup()
        {
            _mockCourseRepository = new Mock<ICourseRepository>();
            _mockUnitOfWork = new MockUnitOfWork
            {
                CourseRepository = _mockCourseRepository.Object
            };
            _courseService = new CourseService(_mockUnitOfWork);
        }

        [Test]
        public async Task TestCreateCourseValidInput()
        {
            //Arrange
            var courseDto = new CourseDto
            {
                Name = "Course1",
                Code = "Code1"
            };

            _mockCourseRepository.Setup(x => x.InsertAsync(It.IsAny<Course>())).Returns(Task.FromResult(1));

            //Act
            var id = await _courseService.CreateCourse(courseDto);

            //Assert
            Assert.AreEqual(0, id);
            _mockCourseRepository.Verify(x => x.InsertAsync(It.IsAny<Course>()), Times.Once);
        }

        [Test]
        public async Task TestGetCourseValidInput()
        {
            //Arrange
            var course = new Course
            {
                Id = 1,
                Name = "Course1",
                Code = "Code1"
            };
            int foundId = 1;

            _mockCourseRepository.Setup(x => x.GetByIdAsync(It.IsAny<int>())).Returns(Task.FromResult<Course>(course));

            //Act
            CourseDto courseDto = await _courseService.GetCourse(foundId);

            //Assert
            Assert.AreEqual(courseDto.Id, foundId);
            Assert.AreEqual(course.Name, courseDto.Name);
            _mockCourseRepository.Verify(x => x.GetByIdAsync(It.IsAny<int>()), Times.Once);
        }

        [Test]
        public async Task TestUpdateCourseValidInput()
        {
            //Arrange
            var courseDto = new CourseDto
            {
                Id = 1,
                Name = "Course1New",
                Code = "Code1New"
            };

            _mockCourseRepository.Setup(x => x.Update(It.IsAny<Course>()));

            //Act
            await _courseService.UpdateCourse(courseDto);

            //Assert
            _mockCourseRepository.Verify(x => x.Update(It.IsAny<Course>()), Times.Once);
        }

        [Test]
        public async Task TestGetAllCourses()
        {
            // arrange
            IEnumerable<Course> courses = new List<Course>
            {
                new Course
                {
                    Id = 13,
                    Code = "my code",
                    Description = "my description",
                    Name = "my name",
                    ProjectCourses = Enumerable.Empty<ProjectCourse>().ToList(),
                }
            };
            _mockCourseRepository.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(courses));

            // act
            var result = await _courseService.GetAllCourses();

            // assert
            Assert.NotNull(result);
            Assert.AreEqual(1, result.Count());
            Assert.AreEqual(13, result.First().Id);
            Assert.AreEqual("my code", result.First().Code);
        }
    }
}