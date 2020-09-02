using Capisso.Repository;
using Moq;
using System;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Capisso.Test.Repository
{
    public class MockUnitOfWork : IUnitOfWork
    {
        public MockUnitOfWork()
        {

        }

        public IOrganisationRepository OrganisationRepository { get; set; }

        public ICourseRepository CourseRepository { get; set; }

        public void Dispose()
        {

        }

        public Task SaveAsync()
        {
            return Task.Delay(0);
        }
    }
}
