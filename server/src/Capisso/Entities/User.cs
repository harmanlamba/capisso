using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Entities
{
    public enum UserRole
    {
        User,
        Admin
    }
    public class User : Entity<int>
    {
        public string Email { get; set; }
        public UserRole UserRole { get; set; }
    }
}
