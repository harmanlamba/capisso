using System;
using System.Collections.Generic;
using Capisso.Entities;

namespace Capisso.Dto
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Notes { get; set; }
        public string Outcome { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public ProjectStatus Status { get; set; }
        public IEnumerable<int> CourseIds { get; set; }
        public int OrganisationId { get; set; }
        public int? ContactId { get; set; }
    }
}