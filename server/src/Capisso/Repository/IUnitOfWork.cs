using System;
using System.Threading.Tasks;

namespace Capisso.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IOrganisationRepository OrganisationRepository { get; }
        Task SaveAsync();
    }
}
