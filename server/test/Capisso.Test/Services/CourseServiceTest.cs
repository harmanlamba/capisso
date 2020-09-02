using Capisso.Dto;
using Capisso.Entities;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Capisso.Test.Services
{
    class CourseServiceTest
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
    }
}
