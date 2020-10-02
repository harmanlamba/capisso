using Capisso.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Capisso.Repository
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task InsertManyAsync(IEnumerable<User> entities);
    }
}
