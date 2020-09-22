using Capisso.Dto;
using Capisso.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Mapper
{
    public class ContactMapper
    {
        public static Contact FromDto(ContactDto contactDto)
        {
            return new Contact
            {
                Id = contactDto.Id,
                Name = contactDto.Name,
                Email = contactDto.Email,
                PhoneNumber = contactDto.PhoneNumber,
                OrganisationId = contactDto.OrganisationId,
            };
        }

        public static ContactDto ToDto(Contact contact)
        {
            return new ContactDto
            {
                Id = contact.Id,
                Name = contact.Name,
                Email = contact.Email,
                PhoneNumber = contact.PhoneNumber,
                OrganisationId = contact.OrganisationId,
            };
        }
    }
}
