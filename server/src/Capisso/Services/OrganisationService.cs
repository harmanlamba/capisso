﻿using Capisso.Dto;
using Capisso.Entities;
using Capisso.Mapper;
using Capisso.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Services
{
    public class OrganisationService : IOrganisationService
    {
        private readonly IUnitOfWork _unitOfWork;

        public OrganisationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<int> CreateOrganisation(OrganisationDto organisationDto)
        {
            var organisation = OrganisationMapper.FromDto(organisationDto);
            await _unitOfWork.OrganisationRepository.InsertAsync(organisation);
            await _unitOfWork.SaveAsync();

            return organisation.Id;
        }

        public async Task<IEnumerable<OrganisationDto>> GetAllOrganisations()
        {
            var organisations = await _unitOfWork.OrganisationRepository.GetAllAsync();
            return organisations.Select(organisation => OrganisationMapper.ToDto(organisation));
        }

        public async Task<OrganisationDto> GetOrganisation(int organisationId)
        {
            var organisation = await _unitOfWork.OrganisationRepository.GetByIdAsync(organisationId);
            if (organisation == null)
            {
                return null;
            }

            return OrganisationMapper.ToDto(organisation);
        }

        public async Task UpdateOrganisation(OrganisationDto organisationDto)
        {
            var organization = OrganisationMapper.FromDto(organisationDto);
            _unitOfWork.OrganisationRepository.Update(organization);
            await _unitOfWork.SaveAsync();
        }
    }
}