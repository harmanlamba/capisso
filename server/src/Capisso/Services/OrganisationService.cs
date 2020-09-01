using Capisso.Dto;
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

        public async Task<IEnumerable<OrganisationDto>> GetAll()
        {
            var organisations = await _unitOfWork.OrganisationRepository.GetAllAsync();
            return organisations.Select(organisation => OrganisationMapper.ToDto(organisation));
        }
    }
}
