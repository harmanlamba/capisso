using Capisso.Entities;
using Microsoft.EntityFrameworkCore;

namespace Capisso.Repository
{
    public class ContactRepository : GenericRepository<Contact>, IContactRepository
    {
        public ContactRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}