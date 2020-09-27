﻿using Capisso.Dto;
using Capisso.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Capisso.Exceptions;
using System.Collections;
using System.Collections.Generic;

namespace Capisso.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

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
