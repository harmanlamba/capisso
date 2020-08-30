using Capisso.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Capisso.Repository
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> FindByAsync(Expression<Func<T, bool>> predicate);
        Task<T> GetByIdAsync(object id);
        Task InsertAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task DeleteByIdAsync(object id);
    }
}
