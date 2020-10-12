using Capisso.Dto;
using Capisso.Entities;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using Moq;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Capisso.Test.Services
{
    public class ProjectServiceTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<IProjectRepository> _mockProjectRepository;
        private Mock<ICourseRepository> _mockCourseRepository;
        private Mock<IOrganisationRepository> _mockOrganisationRepository;
        private Mock<IProjectCourseRepository> _mockProjectCourseRepository;
        private Mock<IContactRepository> _mockContactRepository;
        private ProjectService _projectService;

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
                ContactRepository = _mockContactRepository.Object,
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
            var id = await _projectService.CreateProject(projectDto);

            //Assert
            Assert.AreEqual(0, id);
            _mockProjectRepository.Verify(x => x.InsertAsync(It.IsAny<Project>()), Times.Once);
        }


        [Test]
        public async Task TestGetSingularProject()
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
        public async Task TestGetAllProjectsOne()
        {
            //Arrange
            IEnumerable<Project> projects = new List<Project> {
                new Project
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
                }
            };

            _mockProjectRepository.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(projects));

            //Act
            var result = await _projectService.GetAllProjects();

            //Assert
            Assert.AreEqual(1, result.First().Id);
            Assert.AreEqual(1, result.Count());
            _mockProjectRepository.Verify(x => x.GetAllAsync(), Times.Once);
        }

        [Test]
        public async Task TestGetAllProjectsByOrganisation()
        {
            //Arrange
            int organisationId = 1;
            IEnumerable<Project> projects = new List<Project> {
                new Project
                {
                    Id = 1,
                    Notes = "Test Notes",
                    Outcome = "Test Outcome",
                    Title = "Test Tile",
                    StartDate = new DateTime(),
                    EndDate = new DateTime(),
                    ProjectCourses = Enumerable.Empty<ProjectCourse>().ToList(),
                    OrganisationId = 1,
                    Organisation = new Organisation
                    {
                        Id = 1,
                    }
                },
                new Project
                {
                    Id = 2,
                    Notes = "Test Notes",
                    Outcome = "Test Outcome",
                    Title = "Test Tile",
                    StartDate = new DateTime(),
                    EndDate = new DateTime(),
                    ProjectCourses = Enumerable.Empty<ProjectCourse>().ToList(),
                    OrganisationId = 2,
                    Organisation = new Organisation
                    {
                        Id = 2,
                    }
                },
            };
            var expectedProjects = projects.Take(1);

            _mockProjectRepository.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(projects));

            //Act
            var result = await _projectService.GetAllProjects(organisationId: organisationId);

            //Assert
            Assert.AreEqual(expectedProjects.Count(), result.Count());
            CollectionAssert.AreEquivalent(expectedProjects.Select(p => p.Id), result.Select(p => p.Id));
            _mockProjectRepository.Verify(x => x.GetAllAsync(), Times.Once);
        }

        [Test]
        public async Task TestGetAllProjectsByCourse()
        {
            //Arrange
            int courseId = 1;
            IEnumerable<Project> projects = new List<Project> {
                new Project
                {
                    Id = 1,
                    Notes = "Test Notes",
                    Outcome = "Test Outcome",
                    Title = "Test Tile",
                    StartDate = new DateTime(),
                    EndDate = new DateTime(),
                    ProjectCourses = new List<ProjectCourse>
                    {
                        new ProjectCourse
                        {
                            CourseId = 1
                        }
                    }
                },
                new Project
                {
                    Id = 2,
                    Notes = "Test Notes",
                    Outcome = "Test Outcome",
                    Title = "Test Tile",
                    StartDate = new DateTime(),
                    EndDate = new DateTime(),
                    ProjectCourses = new List<ProjectCourse>
                    {
                        new ProjectCourse
                        {
                            CourseId = 1
                        },
                        new ProjectCourse
                        {
                            CourseId = 2
                        }
                    }
                },
                new Project
                {
                    Id = 3,
                    Notes = "Test Notes",
                    Outcome = "Test Outcome",
                    Title = "Test Tile",
                    StartDate = new DateTime(),
                    EndDate = new DateTime(),
                    ProjectCourses = new List<ProjectCourse>
                    {
                        new ProjectCourse
                        {
                            CourseId = 2
                        }
                    }
                }
            };
            var expectedProjects = projects.Take(2);

            _mockProjectRepository.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(projects));

            //Act
            var result = await _projectService.GetAllProjects(courseId: courseId);

            //Assert
            Assert.AreEqual(expectedProjects.Count(), result.Count());
            CollectionAssert.AreEquivalent(expectedProjects.Select(p => p.Id), result.Select(p => p.Id));
            _mockProjectRepository.Verify(x => x.GetAllAsync(), Times.Once);
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

            _mockProjectRepository.Setup(x => x.Update(It.IsAny<Project>()));
            _mockOrganisationRepository.Setup(x => x.GetByIdAsync(1)).ReturnsAsync(organisation);
            _mockContactRepository.Setup(x => x.GetByIdAsync(1)).Returns(Task.FromResult(contact));

            // Act
            var result = await _projectService.UpdateProject(projectDto);

            //Assert
            Assert.IsTrue(result);
            _mockProjectRepository.Verify(x => x.Update(It.IsAny<Project>()), Times.Once);
        }
    }
}