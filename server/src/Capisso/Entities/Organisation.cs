﻿using System.Collections.Generic;

namespace Capisso.Entities
{
    public enum OrganisationStatus
    {
        Active,
        Inactive
    }

    public class Organisation : Entity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Classifications { get; set; }
        public string Address { get; set; }
        public OrganisationStatus Status { get; set; }
        public virtual List<Project> Projects { get; set; }
        public virtual List<Contact> Contacts { get; set; }
    }
}
