using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Entities
{
    public class Contact : Entity<int>
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Notes { get; set; }
        public virtual Organisation Organisation { get; set; }
        public int OrganisationId { get; set; }
        public virtual List<Project> Projects { get; set; }
    }
}
