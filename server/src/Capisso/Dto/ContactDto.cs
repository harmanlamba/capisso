using System.Collections.Generic;

namespace Capisso.Dto
{
    public class ContactDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Notes { get; set; }
        public int OrganisationId { get; set; }
        public IEnumerable<int> ProjectIds { get; set; }
    }
}
