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
