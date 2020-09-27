using Capisso.Dto;
using Capisso.Mapper;
using Capisso.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capisso.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Capisso.Entities;

namespace Capisso.Services
{
    public class ContactService : IContactService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ContactService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<int> CreateContact(ContactDto contactDto)
        {
            var contact = ContactMapper.FromDto(contactDto);

            contact.Organisation = await _unitOfWork.OrganisationRepository.GetByIdAsync(contact.OrganisationId);
            if (contact.Organisation == null)
            {
                throw new EntityNotFoundException($"organisation with id <{contact.OrganisationId}> not found");
            }

            await _unitOfWork.ContactRepository.InsertAsync(contact);
            await _unitOfWork.SaveAsync();

            return contact.Id;
        }

        public async Task<IEnumerable<ContactDto>> GetContacts(int? organisationId = null, bool? isActive = null)
        {
            IEnumerable<Contact> contacts = await _unitOfWork.ContactRepository.GetAllAsync();

            if (organisationId.HasValue)
            {
                contacts = contacts.Where(c => c.OrganisationId == organisationId);
            }

            if (isActive.HasValue)
            {
                ContactStatus contactStatus = isActive.Value ? ContactStatus.Active : ContactStatus.Inactive;

                contacts = contacts.Where(c => c.Status == contactStatus);
            }

            return contacts.Select(ContactMapper.ToDto);
        }
        public async Task<ContactDto> GetContact(int contactId)
        {
            var contact = await _unitOfWork.ContactRepository.GetByIdAsync(contactId) ?? throw new EntityNotFoundException();

            return ContactMapper.ToDto(contact);
        }

        public async Task UpdateContact(ContactDto contactDto)
        {
            var contact = ContactMapper.FromDto(contactDto);

            // check organisation exists
            contact.Organisation = await _unitOfWork.OrganisationRepository.GetByIdAsync(contactDto.OrganisationId)
                ?? throw new EntityNotFoundException($"organisation with id <{contactDto.OrganisationId}> not found"); ;

            _unitOfWork.ContactRepository.Update(contact);
            await _unitOfWork.SaveAsync();
        }
    }
}
