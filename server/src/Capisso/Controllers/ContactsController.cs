using Capisso.Dto;
using Capisso.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Capisso.Exceptions;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace Capisso.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,User")]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        /// <summary>
        /// Creates a contact from the data in the given contactDto object.
        /// </summary>
        /// <param name="contactDto">Contains the data for the contact to be created.</param>
        /// <returns>
        /// A Created response in the case of the request being successful, where the URI in the location header 
        /// is the location of the newly created contact, and in the body the id of the created contact is returned.
        /// </returns>
        [HttpPost]
        public async Task<ActionResult<CreatedDto>> CreateContact([FromBody] ContactDto contactDto)
        {
            try
            {
                int createdId = await _contactService.CreateContact(contactDto);
                return Created($"/contacts/{createdId}",
                    new CreatedDto { Id = createdId }); //TODO: Configure Base Url from configuration
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Gets a list of all contacts, optionally filtered by organisation id and active status.
        /// </summary>
        /// <param name="organisationId">If present, only contacts in this organisation will be returned.</param>
        /// <param name="isActive">
        /// If present, contacts will be filtered by their status.
        /// If true, only active contacts will be returned. If false, only inactive contacts will be returned.
        /// </param>
        /// <returns>
        /// An Ok response in the case that the request was successful, with the body containing
        /// the list of all filtered contacts.
        /// </returns>
        [HttpGet]
        public async Task<IEnumerable<ContactDto>> GetContacts([FromQuery] int? organisationId = null, [FromQuery] bool? isActive = null)
        {
            return await _contactService.GetContacts(organisationId, isActive);
        }

        [HttpGet("{contactId:int}")]
        public async Task<ActionResult<ContactDto>> GetContact(int contactId)
        {
            ContactDto contactDto;
            try
            {
                contactDto = await _contactService.GetContact(contactId);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }

            return Ok(contactDto);
        }

        /// <summary>
        /// Updates the contact with the given id, with the data in the given contactDto.
        /// </summary>
        /// <param name="contactDto">Contains the new data to update the contact with.</param>
        /// <param name="contactId">The id of the contact to be updated.</param>
        /// <returns>
        /// A NoContent response in the case that the update was successful.
        /// A BadRequest response in the case that the given contact ids do not match.
        /// A NotFound response in the case that the organisation was not found.
        /// </returns>
        [HttpPut("{contactId:int}")]
        public async Task<ActionResult> UpdateContact([FromBody] ContactDto contactDto, [FromRoute] int contactId)
        {
            if (contactDto.Id != contactId)
            {
                return BadRequest();
            }

            try
            {
                await _contactService.UpdateContact(contactDto);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
