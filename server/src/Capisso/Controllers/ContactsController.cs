using Capisso.Dto;
using Capisso.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Capisso.Exceptions;

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
    }
}
