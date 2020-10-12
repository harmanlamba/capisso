using Capisso.Controllers;
using Capisso.Dto;
using Capisso.Entities;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace Capisso.Test.Controllers
{
    public class ProjectsControllerTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<IProjectRepository> _mockProjectRepository;
        private Mock<ICourseRepository> _mockCourseRepository;
        private Mock<IOrganisationRepository> _mockOrganisationRepository;
        private Mock<IProjectCourseRepository> _mockProjectCourseRepository;
        private Mock<IContactRepository> _mockContactRepository;
        private ProjectService _projectService;
        private ProjectsController _projectsController;

        [SetUp]
        public void Setup()
        {
            _mockProjectRepository = new Mock<IProjectRepository>();
            _mockCourseRepository = new Mock<ICourseRepository>();
            _mockOrganisationRepository = new Mock<IOrganisationRepository>();
            _mockProjectCourseRepository = new Mock<IProjectCourseRepository>();
            _mockContactRepository = new Mock<IContactRepository>();
            _mockUnitOfWork = new MockUnitOfWork
            {
                ProjectRepository = _mockProjectRepository.Object,
                CourseRepository = _mockCourseRepository.Object,
                OrganisationRepository = _mockOrganisationRepository.Object,
                ProjectCourseRepository = _mockProjectCourseRepository.Object,
                ContactRepository = _mockContactRepository.Object
            };

            _projectService = new ProjectService(_mockUnitOfWork);

            _projectsController = new ProjectsController(_projectService);
        }

        [Test]
        public async Task TestCreateProjectValidInput()
        {
            var projectDto = new ProjectDto
            {
                Title = "Title1",
                Notes = "Note1",
                Outcome = "Outcome1",
                StartDate = new DateTime(),
                EndDate = new DateTime(),
                CourseIds = Enumerable.Empty<int>(),
                OrganisationId = 1,
                ContactId = 1
            };

            var organisation = new Organisation
            {
                Id = 1,
            };

            Contact contact = new Contact
            {
                Id = 1,
                Name = "Test Name",
                Email = "test@gmail.com",
                PhoneNumber = "111",
                OrganisationId = 1,
                Projects = new List<Project>
                {
                    new Project {
                        Id = 1,
                        Title = "HCI Extreme",
                        Notes = "Notes Test",
                        Outcome = "Outcome Test",
                        StartDate = new DateTime(),
                        EndDate = new DateTime(),
                        ProjectCourses = Enumerable.Empty<ProjectCourse>().ToList(),
                        Organisation = organisation
                    }
                }
            };

            _mockProjectRepository.Setup(x => x.InsertAsync(It.IsAny<Project>())).Returns(Task.FromResult(1));
            _mockOrganisationRepository.Setup(x => x.GetByIdAsync(1)).ReturnsAsync(organisation);
            _mockContactRepository.Setup(x => x.GetByIdAsync(1)).Returns(Task.FromResult(contact));

            // Act
            ActionResult<CreatedDto> response = await _projectsController.CreateProject(projectDto);

            // Assert
            Assert.IsInstanceOf<CreatedResult>(response.Result);
            CreatedResult createdResult = response.Result as CreatedResult;
            Assert.AreEqual(201, createdResult.StatusCode);

            CreatedDto value = createdResult.Value.As<CreatedDto>();
            Assert.IsNotNull(value);
            Assert.AreEqual(0, value.Id);

            _mockProjectRepository.Verify(x => x.InsertAsync(It.IsAny<Project>()), Times.Once);
        }

        [Test]
        public async Task TestGetSingularProject()
        {
            //Arrange
            var project = new Project
            {
                Id = 1,
                Title = "HCI Extreme",
                Notes = "Notes Test",
                Outcome = "Outcome Test",
                StartDate = new DateTime(),
                EndDate = new DateTime(),
                ProjectCourses = Enumerable.Empty<ProjectCourse>().ToList(),
                Organisation = new Organisation
                {
                    Id = 1,
                }
            };

            _mockProjectRepository.Setup(x => x.GetByIdAsync(1)).Returns(Task.FromResult(project));

            //Act
            ActionResult<ProjectDto> response = await _projectsController.GetProject(1);

            //Assert
            Assert.IsInstanceOf<OkObjectResult>(response.Result);
            OkObjectResult okResult = response.Result as OkObjectResult;
            Assert.IsInstanceOf<ProjectDto>(okResult.Value);
            ProjectDto projectDto = okResult.Value.As<ProjectDto>();
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.NotNull(okResult.Value);
            Assert.AreEqual(project.Id, projectDto.Id);
            Assert.AreEqual(project.Title, projectDto.Title);

            _mockProjectRepository.Verify(x => x.GetByIdAsync(It.IsAny<int>()), Times.Once);
        }

        [Test]
        public async Task TestGetSingularProjectNotExists()
        {
            //Arrange
            _mockProjectRepository.Setup(x => x.GetByIdAsync(2)).Returns(Task.FromResult<Project>(null));

            //Act
            ActionResult<ProjectDto> response = await _projectsController.GetProject(2);

            //Assert
            Assert.IsInstanceOf<NotFoundResult>(response.Result);
            NotFoundResult notFoundResult = response.Result as NotFoundResult;

            ProjectDto value = notFoundResult.As<ProjectDto>();
            Assert.IsNull(value);

            _mockProjectRepository.Verify(x => x.GetByIdAsync(It.IsAny<int>()), Times.Once);
        }

        [Test]
        public async Task TestUpdateProjectValidInput()
        {
            var projectDto = new ProjectDto
            {
                Id = 1,
                Title = "NewTitle",
                Notes = "NewNotes",
                Outcome = "NewOutcome",
                StartDate = new DateTime(),
                EndDate = new DateTime(),
                CourseIds = Enumerable.Empty<int>(),
                OrganisationId = 1,
                ContactId = 1
            };

            var organisation = new Organisation
            {
                Id = 1
            };

            Contact contact = new Contact
            {
                Id = 1,
                Name = "Test Name",
                Email = "test@gmail.com",
                PhoneNumber = "111",
                OrganisationId = 2,
                Projects = new List<Project>
                {
                    new Project {
                        Id = 1,
                        Title = "HCI Extreme",
                        Notes = "Notes Test",
                        Outcome = "Outcome Test",
                        StartDate = new DateTime(),
                        EndDate = new DateTime(),
                        ProjectCourses = Enumerable.Empty<ProjectCourse>().ToList(),
                        Organisation = organisation
                    }
                }
            };

            _mockProjectRepository.Setup(x => x.Update(It.IsAny<Project>()));
            _mockOrganisationRepository.Setup(x => x.GetByIdAsync(1)).ReturnsAsync(organisation);
            _mockContactRepository.Setup(x => x.GetByIdAsync(1)).Returns(Task.FromResult(contact));

            // Act
            ActionResult<NonActionAttribute> response = await _projectsController.UpdateProject(projectDto, 1);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(response.Result);

            _mockProjectRepository.Verify(x => x.Update(It.IsAny<Project>()), Times.Once);
        }

        [Test]
        public async Task TestUpdateProjectInvalidInput()
        {
            var projectDto = new ProjectDto
            {
                Id = 2,
                Title = "NewTitle",
                Notes = "NewNotes",
                Outcome = "NewOutcome",
                StartDate = new DateTime(),
                EndDate = new DateTime(),
                CourseIds = Enumerable.Empty<int>(),
                OrganisationId = 1,
            };

            _mockProjectRepository.Setup(x => x.Update(It.IsAny<Project>()));

            // Act
            ActionResult<NonActionAttribute> response = await _projectsController.UpdateProject(projectDto, 1);

            // Assert
            Assert.IsInstanceOf<BadRequestResult>(response.Result);
            _mockProjectRepository.Verify(x => x.Update(It.IsAny<Project>()), Times.Never);
        }
    }
}