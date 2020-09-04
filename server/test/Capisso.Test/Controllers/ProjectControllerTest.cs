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
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace Capisso.Test.Controllers
{
    public class ProjectControllertest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<IProjectRepository> _mockProjectRepository;
        private ProjectService _projectService;
        private ProjectsController _projectsController;

        [SetUp]
        public void Setup()
        {
            _mockProjectRepository = new Mock<IProjectRepository>();
            _mockUnitOfWork = new MockUnitOfWork
            {
                ProjectRepository = _mockProjectRepository.Object
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
            };

            _mockProjectRepository.Setup(x => x.InsertAsync(It.IsAny<Project>())).Returns(Task.FromResult(1));

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
                EndDate = new DateTime()
            };

            _mockProjectRepository.Setup(x => x.GetByIdAsync(1)).Returns(Task.FromResult<Project>(project));


            //Act
            ActionResult<ProjectDto> response = await _projectsController.GetProject(1);
            OkObjectResult okResult = response.Result as OkObjectResult;
            ProjectDto projectDto = okResult.Value.As<ProjectDto>();

            //Assert
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
            NotFoundResult notFoundResult = response.Result as NotFoundResult;

            //Assert
            Assert.AreEqual(404, notFoundResult.StatusCode);

            ProjectDto value = notFoundResult.As<ProjectDto>();
            Assert.IsNull(value);

            _mockProjectRepository.Verify(x => x.GetByIdAsync(It.IsAny<int>()), Times.Once);
        }
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
            };

            _mockProjectRepository.Setup(x => x.Update(It.IsAny<Project>()));

            // Act
            ActionResult<NonActionAttribute> response = await _projectsController.UpdateProject(projectDto, 1);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(response.Result);
            NoContentResult updateResult = response.Result as NoContentResult;
            Assert.AreEqual(204, updateResult.StatusCode);

            _mockProjectRepository.Verify(x => x.Update(It.IsAny<Project>()), Times.Once);
        }

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
            };

            _mockProjectRepository.Setup(x => x.Update(It.IsAny<Project>()));

            // Act
            ActionResult<NonActionAttribute> response = await _projectsController.UpdateProject(projectDto, 2);

            // Assert
            Assert.IsInstanceOf<BadRequestResult>(response.Result);
            BadRequestResult updateResult = response.Result as BadRequestResult;
            Assert.AreEqual(400, updateResult.StatusCode);

            _mockProjectRepository.Verify(x => x.Update(It.IsAny<Project>()), Times.Never);
        }
    }
}