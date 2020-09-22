using System;
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

            // act and assert
            Assert.ThrowsAsync<EntityNotFoundException>(async () => await _contactService.CreateContact(contactDto));
            _mockContactRepository.Verify(x => x.InsertAsync(It.IsAny<Contact>()), Times.Never);
            _mockOrganisationRepository.Verify();
        }
    }
}