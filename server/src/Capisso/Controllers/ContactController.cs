using Capisso.Dto;
using Capisso.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost]
        public async Task<ActionResult<CreatedDto>> CreateContact([FromBody] ContactDto contactDto)
        {
            try
            {
                int createdId = await _contactService.CreateContact(contactDto);
                return Created($"/contact/{createdId}", new CreatedDto { Id = createdId }); //TODO: Configure Base Url from configuration
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
        }

    }
}
