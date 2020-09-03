using System;
using System.Threading.Tasks;

namespace Capisso.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IOrganisationRepository OrganisationRepository { get; }
        ICourseRepository CourseRepository { get; }
        IProjectRepository ProjectRepository { get; }
        Task SaveAsync();
    }
}
