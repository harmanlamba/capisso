﻿using Capisso.Controllers;
using Capisso.Dto;
using Capisso.Entities;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Test.Controllers
{
    public class CoursesControllerTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<ICourseRepository> _mockCourseRepository;
        private CourseService _courseService;
        private CoursesController _coursesController;

        [SetUp]
        public void Setup()
        {
            _mockCourseRepository = new Mock<ICourseRepository>();
            _mockUnitOfWork = new MockUnitOfWork
            {
                CourseRepository = _mockCourseRepository.Object
            };

            _courseService = new CourseService(_mockUnitOfWork);

            _coursesController = new CoursesController(_courseService);
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
            ActionResult<CreatedDto> response = await _coursesController.CreateCourse(courseDto);

            //Assert
            Assert.IsInstanceOf<CreatedResult>(response.Result);
            CreatedResult createdResult = response.Result as CreatedResult;
            Assert.AreEqual(201, createdResult.StatusCode);

            CreatedDto value = createdResult.Value.As<CreatedDto>();
            Assert.IsNotNull(value);
            Assert.AreEqual(0, value.Id);

            _mockCourseRepository.Verify(x => x.InsertAsync(It.IsAny<Course>()), Times.Once);
        }

        [Test]
        public async Task TestGetSingularCourse()
        {
            //Arrange
            var course = new Course
            {
                Id = 1,
                Name = "Course1",
                Code = "Code1"
            };

            _mockCourseRepository.Setup(x => x.GetByIdAsync(1)).Returns(Task.FromResult<Course>(course));

            //Act
            ActionResult<CourseDto> response = await _coursesController.GetCourse(1);
            OkObjectResult okResult = response.Result as OkObjectResult;
            CourseDto courseDto = okResult.Value.As<CourseDto>();

            //Assert
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.NotNull(okResult.Value);
            Assert.AreEqual(course.Id, courseDto.Id);
            Assert.AreEqual(course.Name, courseDto.Name);
            _mockCourseRepository.Verify(x => x.GetByIdAsync(It.IsAny<int>()), Times.Once);
        }

        [Test]
        public async Task TestUpdateSingularCourse()
        {
            //Arrange
            var courseDto = new CourseDto
            {
                Id = 1,
                Name = "Course1",
                Code = "Code1"
            };

            _mockCourseRepository.Setup(x => x.Update(It.IsAny<Course>()));

            //Act
            ActionResult response = await _coursesController.UpdateCourse(courseDto, 1);

            //Assert
            Assert.IsInstanceOf(typeof(NoContentResult), response);

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
            var response = await _coursesController.GetAllCourses();

            // assert
            Assert.IsInstanceOf<OkObjectResult>(response.Result);
            var result = response.Result as OkObjectResult;

            Assert.IsInstanceOf<IEnumerable<CourseDto>>(result.Value);
            var value = result.Value as IEnumerable<CourseDto>;

            Assert.AreEqual(1, value.Count());
            Assert.AreEqual(13, value.First().Id);
            Assert.AreEqual("my code", value.First().Code);
        }
    }
}