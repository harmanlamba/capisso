using Capisso.Entities;
using Microsoft.EntityFrameworkCore;

namespace Capisso.Repository
{
    public class OrganisationRepository : GenericRepository<Organisation>, IOrganisationRepository
    {
        public OrganisationRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
