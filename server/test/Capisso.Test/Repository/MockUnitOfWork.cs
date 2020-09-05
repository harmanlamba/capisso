﻿using Capisso.Repository;
using System.Threading.Tasks;

namespace Capisso.Test.Repository
{
    public class MockUnitOfWork : IUnitOfWork
    {
        public IOrganisationRepository OrganisationRepository { get; set; }
        public ICourseRepository CourseRepository { get; set; }
        public IProjectRepository ProjectRepository { get; set; }
        public IProjectCourseRepository ProjectCourseRepository { get; set; }

        public void Dispose()
        {
        }

        public Task SaveAsync()
        {
            return Task.Delay(0);
        }
    }
}