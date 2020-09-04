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
            _mockUnitOfWork = new MockUnitOfWork
            {
                OrganisationRepository = _mockOrganisationRepository.Object
            };

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
            IEnumerable<Organisation> organisations = new List<Organisation>
            {
                new Organisation
                {
                    Id = 1,
                    Name = "Test1",
                    Address = "55 Symonds",
                    Description = "UoA Accomodation",
                    Status = "Adequate",
                    Classifications = new List<string> {"Classficiation", "Classification1"}
                }
            };

            _mockOrganisationRepository.Setup(x => x.GetAllAsync())
                .Returns(Task.FromResult(organisations));

            //Act
            var response = await _organisationsController.GetAllOrganisations();

            //Assert
            Assert.AreEqual(1, response.Count());
            Assert.AreEqual(organisations.First().Id, response.First().Id);
            Assert.AreEqual(organisations.First().Name, response.First().Name);
        }

        [Test]
        public async Task TestGetOneOrganisation()
        {
            //Arrange
            var organisation = new Organisation
            {
                Id = 1,
                Name = "Test1",
                Address = "55 Symonds",
                Description = "UoA Accomodation",
                Status = "Adequate",
                Classifications = new List<string> { "Classficiation", "Classification1" }
            };

            _mockOrganisationRepository.Setup(x => x.GetByIdAsync(1))
                .Returns(Task.FromResult(organisation));

            //Act
            var response = await _organisationsController.GetOrganisation(1);

            //Assert
            Assert.IsInstanceOf<OkObjectResult>(response.Result);
            var result = response.Result as OkObjectResult;

            Assert.IsInstanceOf<OrganisationDto>(result.Value);
            var value = result.Value as OrganisationDto;

            Assert.AreEqual(organisation.Id, value.Id);
            Assert.AreEqual(organisation.Name, value.Name);
        }

        [Test]
        public async Task TestGetOneOrganisationNotExists()
        {
            //Arrange
            _mockOrganisationRepository.Setup(x => x.GetByIdAsync(2))
                .Returns(Task.FromResult<Organisation>(null));

            //Act
            var response = await _organisationsController.GetOrganisation(2);

            //Assert
            Assert.Null(response.Value);
            Assert.IsInstanceOf<NotFoundResult>(response.Result);
        }

        [Test]
        public async Task TestUpdateOrganisationWithValidId()
        {
            // Arrange
            var organisation = new Organisation
            {
                Id = 1,
                Name = "Test1",
                Address = "55 Symonds",
                Description = "UoA Accomodation",
                Status = "Adequate",
                Classifications = new List<string> { "Classficiation", "Classification1" }
            };
            
            // Arrange
            var organisationUpdated = new OrganisationDto
            {
                Id = 1,
                Name = "Test12",
                Address = "55 Symmonds",
                Description = "UoA Accomodation",
                Status = "Adequate",
                Classifications = new List<string> { "Classficiation", "Classification1" }
            };
            
            _mockOrganisationRepository.Setup(x => x.GetByIdAsync(1))
                .Returns(Task.FromResult(organisation));
            
            _mockOrganisationRepository.Setup(x => x.Update(It.IsAny<Organisation>())).Verifiable();

            // Act
            var response = await _organisationsController.UpdateOrganisation(organisationUpdated, 1);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(response);
            _mockOrganisationRepository.Verify();
        }

        [Test]
        public async Task TestUpdateOrganisationWithInvalidId()
        {
            // Arrange
            var organisation = new OrganisationDto
            {
                Id = 1,
                Name = "Test1",
                Address = "55 Symonds",
                Description = "UoA Accomodation",
                Status = "Adequate",
                Classifications = new List<string> { "Classficiation", "Classification1" }
            };

            // Act
            var response = await _organisationsController.UpdateOrganisation(organisation, 2);

            // Assert
            Assert.IsInstanceOf<BadRequestResult>(response);
            _mockOrganisationRepository.Verify(x => x.Update(It.IsAny<Organisation>()), Times.Never);
        }
    }
}