using System.Collections.Generic;
using System.Threading.Tasks;
using Capisso.Dto;
using Capisso.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Capisso.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,User")]
    public class OrganisationsController : ControllerBase
    {
        private readonly IOrganisationService _organisationService;

        public OrganisationsController(IOrganisationService organisationService)
        {
            _organisationService = organisationService;
        }

        /// <summary>
        /// Gets a list of all organisations.
        /// </summary>
        /// <returns>
        /// An Ok response in the case that the request was successful, with the body containing
        /// the list of all organisations.
        /// </returns>
        [HttpGet]
        public async Task<IEnumerable<OrganisationDto>> GetAllOrganisations()
        {
            return await _organisationService.GetAllOrganisations();
        }

        /// <summary>
        /// Gets a single organisation with the given id.
        /// </summary>
        /// <param name="organisationId">The id of the organisation to be retrieved.</param>
        /// <returns>
        /// An Ok response in the case of the request being successful, and the organisation data in the body.
        /// A NotFound response in the case that no organisation matching the given id was found.
        /// </returns>
        [HttpGet]
        [Route("{organisationId}")]
        public async Task<ActionResult<OrganisationDto>> GetOrganisation(int organisationId)
        {
            var organisation = await _organisationService.GetOrganisation(organisationId);
            if (organisation == null)
            {
                return NotFound();
            }

            return Ok(organisation);
        }

        /// <summary>
        /// Creates an organisation from the data in the given organisationDto object.
        /// </summary>
        /// <param name="organisationDto">Contains the data for the organisation to be created.</param>
        /// <returns>
        /// A Created response in the case of the request being successful, where the URI in the location header 
        /// is the location of the newly created organisation, and in the body the id of the created organisation is returned.
        /// </returns>
        [HttpPost]
        public async Task<ActionResult<CreatedDto>> CreateOrganisation([FromBody] OrganisationDto organisationDto)
        {
            int createdId = await _organisationService.CreateOrganisation(organisationDto);
            return Created($"/organisations/{createdId}",
                new CreatedDto { Id = createdId }); //TODO: Configure Base Url from configuration
        }

        /// <summary>
        /// Updates the organisation with the given id, with the data in the given organisationDto.
        /// </summary>
        /// <param name="organisationDto">Contains the new data to update the organisation with.</param>
        /// <param name="organisationId">The id of the organisation to be updated.</param>
        /// <returns>
        /// A NoContent response in the case that the update was successful.
        /// A BadRequest response in the case that the given organisation ids do not match.
        /// </returns>
        [HttpPut]
        [Route("{organisationId}")]
        public async Task<ActionResult> UpdateOrganisation([FromBody] OrganisationDto organisationDto,
            [FromRoute] int organisationId)
        {
            if (organisationDto.Id != organisationId)
            {
                return BadRequest();
            }

            await _organisationService.UpdateOrganisation(organisationDto);
            return NoContent();
        }
    }
}