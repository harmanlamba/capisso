using Capisso.Dto;
using Capisso.Mapper;
using Capisso.Repository;
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
    }
}
