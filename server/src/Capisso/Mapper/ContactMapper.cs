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
                Status = contactDto.Status,
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
                Status = contact.Status,
                OrganisationId = contact.OrganisationId,
                ProjectIds = contact.Projects.Select(x => x.Id),
                HasActiveProject = contact.Projects.Any(p => p.Status == ProjectStatus.InProgress || p.Status == ProjectStatus.Pending)
            };
        }
    }
}
