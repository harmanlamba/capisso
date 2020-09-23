﻿using Capisso.Dto;
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

        public async Task<IEnumerable<ContactDto>> GetContacts(int? organisationId)
        {
            IEnumerable<Contact> contacts;

            if (organisationId == null)
            {
                contacts = await _unitOfWork.ContactRepository.GetAllAsync();
            }
            else
            {
                contacts = await _unitOfWork.ContactRepository.FindByAsync(contact => contact.OrganisationId == organisationId);
            }

            var contactDtos = contacts.Select(ContactMapper.ToDto);

            return contactDtos;
        }

    }
}