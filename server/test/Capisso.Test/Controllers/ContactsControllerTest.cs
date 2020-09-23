using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Capisso.Controllers;
using Capisso.Dto;
using Capisso.Entities;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace Capisso.Test.Controllers
{
    public class ContactsControllerTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<IContactRepository> _mockContactRepository;
        private Mock<IOrganisationRepository> _mockOrganisationRepository;
        private ContactService _contactService;
        private ContactsController _contactsController;

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
            _contactsController = new ContactsController(_contactService);
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
                Notes = "notes",
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
            var response = await _contactsController.CreateContact(contactDto);

            // assert
            Assert.IsInstanceOf<CreatedResult>(response.Result);
            var createdResult = response.Result as CreatedResult;

            var value = createdResult.Value as CreatedDto;
            Assert.IsNotNull(value);
            Assert.AreEqual(0, value.Id);

            _mockContactRepository.Verify();
            _mockOrganisationRepository.Verify();
        }

        [Test]
        public async Task TestCreateContactInvalidOrganisation()
        {
            // arrange
            var contactDto = new ContactDto
            {
                Name = "name",
                PhoneNumber = "123",
                Email = "name@name.com",
                Notes = "notes",
                OrganisationId = 69,
            };
            _mockContactRepository
                .Setup(x => x.InsertAsync(It.IsAny<Contact>()))
                .Returns(Task.FromResult(1));
            _mockOrganisationRepository
                .Setup(x => x.GetByIdAsync(69))
                .Returns(Task.FromResult<Organisation>(null))
                .Verifiable();

            // act
            var response = await _contactsController.CreateContact(contactDto);

            // assert
            Assert.IsInstanceOf<NotFoundResult>(response.Result);

            _mockContactRepository.Verify(x => x.InsertAsync(It.IsAny<Contact>()), Times.Never);
            _mockOrganisationRepository.Verify();
        }

        [Test]
        public async Task TestGetContactsByOrganisations()
        {
            // arrange
            Contact contact = new Contact
            {
                Id = 1,
                Name = "Ur'Zababa",
                Email = "test@gmail.com",
                PhoneNumber = "111",
                OrganisationId = 69,
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

            List<Contact> contacts = new List<Contact>();
            contacts.Add(contact);


            _mockContactRepository.Setup(x => x.FindByAsync(It.IsAny<Expression<Func<Contact, bool>>>())).Returns(Task.FromResult((IEnumerable<Contact>)contacts));

            // act
            var response = await _contactsController.GetContacts(1);
            var responseList = response.ToList();

            // assert
            Assert.AreEqual(1, response.Count());
            Assert.AreEqual(1, responseList[0].Id);
            Assert.AreEqual("Ur'Zababa", responseList[0].Name);
        }

    }
}