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

    public class OrganisationServiceTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<IOrganisationRepository> _mockOrganisationRepository;
        private OrganisationService _organisationService;

        [SetUp]
        public void Setup()
        {
            _mockOrganisationRepository = new Mock<IOrganisationRepository>();
            _mockUnitOfWork = new MockUnitOfWork
            {
                OrganisationRepository = _mockOrganisationRepository.Object
            };

            _organisationService = new OrganisationService(_mockUnitOfWork);
        }

        [Test]
        public async Task TestCreateOrganisationValidInput()
        {
            //Arrange
            var organisationDto = new OrganisationDto
            {
                Name = "Test1",
                Address = "55 Symonds",
                Description = "UoA Accomodation",
                Status = "Adequate",
                Classifications = new List<string> { "Classficiation", "Classification1" }
            };

            _mockOrganisationRepository.Setup(x => x.InsertAsync(It.IsAny<Organisation>())).Returns(Task.FromResult(1));

            //Act
            var id = await _organisationService.CreateOrganisation(organisationDto);

            //Assert
            Assert.AreEqual(0, id);
            _mockOrganisationRepository.Verify(x => x.InsertAsync(It.IsAny<Organisation>()), Times.Once);
        }
    }
}
