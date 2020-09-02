using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Capisso.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _dbContext;
        public UnitOfWork(CapissoContext dbContext)
        {
            _dbContext = dbContext;

            OrganisationRepository = new OrganisationRepository(_dbContext);
            CourseRepository = new CourseRepository(_dbContext);
        }

        public IOrganisationRepository OrganisationRepository { get; private set; }

        public ICourseRepository CourseRepository { get; private set; }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
        public void Dispose()
        {
            _dbContext.Dispose();
        }
    }
}
