﻿using Capisso.Dto;
using Capisso.Entities;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
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
                Status = OrganisationStatus.Active,
                Classifications = new List<string> { "Classficiation", "Classification1" }
            };

            _mockOrganisationRepository.Setup(x => x.InsertAsync(It.IsAny<Organisation>())).Returns(Task.FromResult(1));

            //Act
            var id = await _organisationService.CreateOrganisation(organisationDto);

            //Assert
            Assert.AreEqual(0, id);
            _mockOrganisationRepository.Verify(x => x.InsertAsync(It.IsAny<Organisation>()), Times.Once);
        }

        [Test]
        public async Task TestUpdateOrganisationValidInput()
        {
            // Arrange
            var organisation = new Organisation
            {
                Id = 1,
                Name = "Test1",
                Address = "55 Symonds",
                Description = "UoA Accomodation",
                Status = OrganisationStatus.Active,
                Classifications = new List<string> { "Classficiation", "Classification1" }
            };

            var organisationUpdated = new OrganisationDto
            {
                Id = 1,
                Name = "Test12",
                Address = "55 Symmonds",
                Description = "UoA Accomodation",
                Status = OrganisationStatus.Active,
                Classifications = new List<string> { "Classficiation", "Classification1" }
            };

            _mockOrganisationRepository.Setup(x => x.GetByIdAsync(1))
                .Returns(Task.FromResult(organisation));

            _mockOrganisationRepository.Setup(x => x.Update(It.IsAny<Organisation>())).Verifiable();


            //Act
            await _organisationService.UpdateOrganisation(organisationUpdated);

            // Assert
            _mockOrganisationRepository.Verify();
        }
    }
}