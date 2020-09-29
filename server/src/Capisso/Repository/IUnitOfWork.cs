using System;
using System.Threading.Tasks;

namespace Capisso.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IOrganisationRepository OrganisationRepository { get; }
        ICourseRepository CourseRepository { get; }
        IProjectRepository ProjectRepository { get; }
        IProjectCourseRepository ProjectCourseRepository { get; }
        IContactRepository ContactRepository { get; }
        IUserRepository UserRepository { get; }
        Task SaveAsync();
    }
}