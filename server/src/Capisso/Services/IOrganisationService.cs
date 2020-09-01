using Capisso.Dto;
using System.Threading.Tasks;

namespace Capisso.Services
{
    public interface IOrganisationService
    {
        Task<int> CreateOrganisation(OrganisationDto organisationDto);
    }
}
