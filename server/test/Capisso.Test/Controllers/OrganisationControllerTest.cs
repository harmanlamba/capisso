using Capisso.Controllers;
using Capisso.Dto;
using Capisso.Entities;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Capisso.Test.Controllers
{
    public class OrganisationControllerTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<IOrganisationRepository> _mockOrganisationRepository;
        private OrganisationService _organisationService;
        private OrganisationsController _organisationsController;

        [SetUp]
        public void Setup()
        {
            _mockOrganisationRepository = new Mock<IOrganisationRepository>();
            _mockUnitOfWork = new MockUnitOfWork(_mockOrganisationRepository.Object);
            _organisationService = new OrganisationService(_mockUnitOfWork);

            _organisationsController = new OrganisationsController(_organisationService);
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
            ActionResult<CreatedDto> response = await _organisationsController.CreateOrganisation(organisationDto);

            //Assert
            Assert.IsInstanceOf<CreatedResult>(response.Result);
            CreatedResult createdResult = response.Result as CreatedResult;
            Assert.AreEqual(201, createdResult.StatusCode);

            CreatedDto value = createdResult.Value.As<CreatedDto>();
            Assert.IsNotNull(value);
            Assert.AreEqual(0, value.Id);

            _mockOrganisationRepository.Verify(x => x.InsertAsync(It.IsAny<Organisation>()), Times.Once);
        }

        [Test]
        public async Task TestGetAllOrganisationOne()
        {
            //Arrange
            var organisations = new List<Organisation> {
                new Organisation {
                    Id = 1,
                    Name = "Test1",
                    Address = "55 Symonds",
                    Description = "UoA Accomodation",
                    Status = "Adequate",
                    Classifications = new List<string> { "Classficiation", "Classification1" }
                }
            };

            _mockOrganisationRepository.Setup(x => x.GetAllAsync())
                .Returns(async () => organisations);

            //Act
            IEnumerable<OrganisationDto> response = await _organisationsController.GetAllOrganisations();

            //Assert
            Assert.That(response.Count() == 1);
            Assert.AreEqual(organisations.First().Id, response.First().Id);
            Assert.AreEqual(organisations.First().Name, response.First().Name);
        }

    }
}
