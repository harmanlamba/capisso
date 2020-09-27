using System.Collections.Generic;

namespace Capisso.Entities
{
    public enum ContactStatus
    {
        Active,
        Inactive
    }

    public class Contact : Entity<int>
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public ContactStatus Status { get; set; }
        public virtual Organisation Organisation { get; set; }
        public int OrganisationId { get; set; }
        public virtual List<Project> Projects { get; set; }
    }
}
