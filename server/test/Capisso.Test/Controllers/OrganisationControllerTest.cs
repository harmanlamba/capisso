﻿using Capisso.Controllers;
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
using System.Net.Http;
using System.Threading.Tasks;

namespace Capisso.Test.Controllers
{
    public class OrganisationControllerTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<IOrganisationRepository> _mockOrganisationRepository;
        private OrganisationService _organisationService;
        private OrganisationController _organisationController;

        [SetUp]
        public void Setup()
        {
            _mockOrganisationRepository = new Mock<IOrganisationRepository>();
            _mockUnitOfWork = new MockUnitOfWork(_mockOrganisationRepository.Object);
            _organisationService = new OrganisationService(_mockUnitOfWork);

            _organisationController = new OrganisationController(_organisationService);
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
            ActionResult<CreatedDto> response = await _organisationController.CreateOrganisation(organisationDto);

            //Assert
            Assert.IsInstanceOf<CreatedResult>(response.Result);
            CreatedResult createdResult = response.Result as CreatedResult;
            Assert.AreEqual(201, createdResult.StatusCode);

            CreatedDto value = createdResult.Value.As<CreatedDto>();
            Assert.IsNotNull(value);
            Assert.AreEqual(0, value.Id);

            _mockOrganisationRepository.Verify(x => x.InsertAsync(It.IsAny<Organisation>()), Times.Once);
        }

    }
}
