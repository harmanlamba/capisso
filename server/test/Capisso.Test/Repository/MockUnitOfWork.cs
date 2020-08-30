using Capisso.Repository;
using Moq;
using System;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Capisso.Test.Repository
{
    public class MockUnitOfWork : IUnitOfWork
    {
        public MockUnitOfWork(IOrganisationRepository organisationRepository)
        {
            OrganisationRepository = organisationRepository;
        }

        public IOrganisationRepository OrganisationRepository { get; }

        public void Dispose()
        {

        }

        public Task SaveAsync()
        {
            return Task.Delay(0);
        }
    }
}
