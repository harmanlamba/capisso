using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capisso.Dto;
using Capisso.Entities;
using Capisso.Exceptions;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using Moq;
using NUnit.Framework;

namespace Capisso.Test.Services
{
    public class ContactServiceTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<IContactRepository> _mockContactRepository;
        private Mock<IOrganisationRepository> _mockOrganisationRepository;
        private ContactService _contactService;

        [SetUp]
        public void Setup()
        {
            _mockContactRepository = new Mock<IContactRepository>();
            _mockOrganisationRepository = new Mock<IOrganisationRepository>();
            _mockUnitOfWork = new MockUnitOfWork
            {
                ContactRepository = _mockContactRepository.Object,
                OrganisationRepository = _mockOrganisationRepository.Object,
            };
            _contactService = new ContactService(_mockUnitOfWork);
        }

        [Test]
        public async Task TestCreateContactValidInput()
        {
            // arrange
            var contactDto = new ContactDto
            {
                Name = "name",
                PhoneNumber = "123",
                Email = "name@name.com",
                OrganisationId = 1,
            };
            _mockContactRepository
                .Setup(x => x.InsertAsync(It.IsAny<Contact>()))
                .Returns(Task.FromResult(1))
                .Verifiable();
            _mockOrganisationRepository
                .Setup(x => x.GetByIdAsync(1))
                .ReturnsAsync(new Organisation { Id = 1 })
                .Verifiable();

            // act
            var id = await _contactService.CreateContact(contactDto);

            // assert
            Assert.AreEqual(0, id);
            _mockContactRepository.Verify();
            _mockOrganisationRepository.Verify();
        }

        [Test]
        public void TestCreateContactInvalidOrganisation()
        {
            // arrange
            var contactDto = new ContactDto
            {
                Name = "name",
                PhoneNumber = "123",
                Email = "name@name.com",
                OrganisationId = 1,
            };
            _mockContactRepository
                .Setup(x => x.InsertAsync(It.IsAny<Contact>()))
                .Returns(Task.FromResult(1));
            _mockOrganisationRepository
                .Setup(x => x.GetByIdAsync(1))
                .Returns(Task.FromResult<Organisation>(null))
                .Verifiable();

            // act and assert
            Assert.ThrowsAsync<EntityNotFoundException>(async () => await _contactService.CreateContact(contactDto));
            _mockContactRepository.Verify(x => x.InsertAsync(It.IsAny<Contact>()), Times.Never);
            _mockOrganisationRepository.Verify();
        }

        [Test]
        public async Task TestGetSingularContact()
        {
            //Arrange
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
                        Organisation = new Organisation
                        {
                            Id = 1,
                        }}
                }
            };

            _mockContactRepository.Setup(x => x.GetByIdAsync(It.IsAny<int>()))
                .Returns(Task.FromResult(contact));


            //Act
            var contactDto = await _contactService.GetContact(1);

            //Assert
            Assert.AreEqual(1, contactDto.Id);
            _mockContactRepository.Verify(x => x.GetByIdAsync(It.IsAny<int>()), Times.Once);
        }

        [Test]
        public async Task TestUpdateContactValidInput()
        {
            var contactDto = new ContactDto
            {
                Id = 1,
                Name = "NewName",
                PhoneNumber = "021111111111",
                Email = "new@email.com",
                OrganisationId = 1,
                ProjectIds = new List<int>(1)
            };

            var organisation = new Organisation
            {
                Id = 1
            };

            _mockContactRepository.Setup(x => x.Update(It.IsAny<Contact>()));
            _mockOrganisationRepository.Setup(x => x.GetByIdAsync(1)).ReturnsAsync(organisation);

            // Act
            await _contactService.UpdateContact(contactDto);

            // Assert
            _mockContactRepository.Verify();
        }
    }
}