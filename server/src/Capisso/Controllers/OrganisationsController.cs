using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capisso.Dto;
using Capisso.Entities;
using Capisso.Services;
using Microsoft.AspNetCore.Mvc;

namespace Capisso.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrganisationsController : ControllerBase
    {
        private readonly IOrganisationService _organisationService;

        public OrganisationsController(IOrganisationService organisationService)
        {
            _organisationService = organisationService;
        }

        [HttpGet]
        public async Task<IEnumerable<OrganisationDto>> ViewAllOrganisations()
        {
            return await _organisationService.GetAll();
        }

        [HttpPost]
        public async Task<ActionResult<CreatedDto>> CreateOrganisation([FromBody] OrganisationDto organisationDto)
        {
            int createdId = await _organisationService.CreateOrganisation(organisationDto);
            return Created($"/organisations/{createdId}", new CreatedDto { Id = createdId }); //TODO: Configure Base Url from configuration
        }

    }
}
