using Capisso.Dto;
using Capisso.Entities;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capisso.Test.Services
{
    public class ProjectServiceTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<IProjectRepository> _mockProjectRepository;
        private Mock<ICourseRepository> _mockCourseRepository;
        private Mock<IOrganisationRepository> _mockOrganisationRepository;
        private ProjectService _projectService;

        [SetUp]
        public void Setup()
        {
            _mockProjectRepository = new Mock<IProjectRepository>();
            _mockCourseRepository = new Mock<ICourseRepository>();
            _mockOrganisationRepository = new Mock<IOrganisationRepository>();
            _mockUnitOfWork = new MockUnitOfWork
            {
                ProjectRepository = _mockProjectRepository.Object,
                CourseRepository = _mockCourseRepository.Object,
                OrganisationRepository = _mockOrganisationRepository.Object,
            };
            _projectService = new ProjectService(_mockUnitOfWork);
        }

        [Test]
        public async Task TestCreateProjectValidInput()
        {
            // Arrange
            var projectDto = new ProjectDto
            {
                Title = "Title1",
                Notes = "Note1",
                Outcome = "Outcome1",
                StartDate = new DateTime(),
                EndDate = new DateTime(),
                CourseIds = Enumerable.Empty<int>(),
                OrganisationId = 1,
            };

            _mockProjectRepository.Setup(x => x.InsertAsync(It.IsAny<Project>())).Returns(Task.FromResult(1));

            // Act
            var id = await _projectService.CreateProject(projectDto);

            //Assert
            Assert.AreEqual(0, id);
            _mockProjectRepository.Verify(x => x.InsertAsync(It.IsAny<Project>()), Times.Once);
        }


        [Test]
        public async Task TestGetSingularOrganisation()
        {
            //Arrange
            var project = new Project
            {
                Id = 1,
                Notes = "Test Notes",
                Outcome = "Test Outcome",
                Title = "Test Tile",
                StartDate = new DateTime(),
                EndDate = new DateTime(),
                ProjectCourses = Enumerable.Empty<ProjectCourse>().ToList(),
                Organisation = new Organisation
                {
                    Id = 1,
                }
            };

            _mockProjectRepository.Setup(x => x.GetByIdAsync(It.IsAny<int>()))
                .Returns(Task.FromResult(project));

            //Act
            var projectDto = await _projectService.GetProject(1);

            //Assert
            Assert.AreEqual(1, projectDto.Id);
            _mockProjectRepository.Verify(x => x.GetByIdAsync(It.IsAny<int>()), Times.Once);
        }

        [Test]
        public async Task TestUpdateProjectValidInput()
        {
            var projectDto = new ProjectDto
            {
                Title = "NewTitle",
                Notes = "Note1",
                Outcome = "Outcome1",
                StartDate = new DateTime(),
                EndDate = new DateTime(),
                CourseIds = Enumerable.Empty<int>(),
                OrganisationId = 1,
            };

            _mockProjectRepository.Setup(x => x.Update(It.IsAny<Project>()));

            // Act
            var result = await _projectService.UpdateProject(projectDto);

            //Assert
            Assert.IsTrue(result);
            _mockProjectRepository.Verify(x => x.Update(It.IsAny<Project>()), Times.Once);
        }
    }
}