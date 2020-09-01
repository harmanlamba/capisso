using System.Collections.Generic;

namespace Capisso.Dto
{
    public class OrganisationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IEnumerable<string> Classifications { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }
    }
}
