using System;
using System.Collections.Generic;

namespace Capisso.Entities
{
    public enum ProjectStatus
    {
        Pending,
        InProgress,
        CompletedSuccessfully,
        CompletedWithIssues
    }

    public class Project : Entity<int>
    {
        public string Title { get; set; }
        public string Notes { get; set; }
        public string Outcome { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public ProjectStatus Status { get; set; }
        public virtual List<ProjectCourse> ProjectCourses { get; set; }
        public virtual Organisation Organisation { get; set; }
        public int OrganisationId { get; set; }
        public virtual Contact Contact {get;set;}
        public int? ContactId { get; set; }

    }
}