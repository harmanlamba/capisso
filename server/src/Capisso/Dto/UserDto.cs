using Capisso.Entities;

namespace Capisso.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public UserRole UserRole { get; set; }
    }
}