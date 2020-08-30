﻿using Capisso.Dto;
using Capisso.Entities;
using System.Linq;

namespace Capisso.Mapper
{
    public static class OrganisationMapper
    {
        public static Organisation FromDto(OrganisationDto organisationDto)
        {
            return new Organisation
            {
                Id = organisationDto.Id,
                Name = organisationDto.Name,
                Address = organisationDto.Address,
                Classifications = organisationDto.Classifications.ToList(),
                Description = organisationDto.Description,
                Status = organisationDto.Status
            };
        }
    }
}