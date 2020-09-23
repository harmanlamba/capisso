using System.Collections.Generic;
using Capisso.Entities;

namespace Capisso.Dto
{
    public class OrganisationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IEnumerable<string> Classifications { get; set; }
        public string Address { get; set; }
        public OrganisationStatus Status { get; set; }
        public int? ProjectCount { get; set; }
    }
}
