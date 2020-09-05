using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capisso.Dto;
using Capisso.Entities;
using Capisso.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IEnumerable<OrganisationDto>> GetAllOrganisations()
        {
            return await _organisationService.GetAllOrganisations();
        }

        [HttpGet]
        [Route("{organisationId}")]
        public async Task<ActionResult<OrganisationDto>> GetOrganisation(int organisationId)
        {
            var organisation = await _organisationService.GetOrganisation(organisationId);
            if (organisation == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(organisation);
            }
        }

        [HttpPost]
        public async Task<ActionResult<CreatedDto>> CreateOrganisation([FromBody] OrganisationDto organisationDto)
        {
            int createdId = await _organisationService.CreateOrganisation(organisationDto);
            return Created($"/organisations/{createdId}",
                new CreatedDto { Id = createdId }); //TODO: Configure Base Url from configuration
        }

        [HttpPut]
        [Route("{organisationId}")]
        public async Task<ActionResult> UpdateOrganisation([FromBody] OrganisationDto organisationDto,
            [FromRoute] int organisationId)
        {
            if (organisationDto.Id != organisationId)
            {
                return BadRequest();
            }

            var organisation = await _organisationService.GetOrganisation(organisationId);
            if (organisation == null)
            {
                return NotFound();
            }

            await _organisationService.UpdateOrganisation(organisationDto);
            return NoContent();

        }
    }
}