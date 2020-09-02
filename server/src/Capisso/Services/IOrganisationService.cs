using Capisso.Dto;
using Capisso.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Capisso.Services
{
    public interface IOrganisationService
    {
        Task<int> CreateOrganisation(OrganisationDto organisationDto);
        Task<IEnumerable<OrganisationDto>> GetAll();
    }
}
