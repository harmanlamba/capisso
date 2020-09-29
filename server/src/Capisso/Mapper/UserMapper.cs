using Capisso.Dto;
using Capisso.Entities;

namespace Capisso.Mapper
{
    public static class UserMapper
    {
        public static User FromDto(UserDto userDto)
        {
            return new User
            {
                Id = userDto.Id,
                Email = userDto.Email,
                UserRole = userDto.UserRole,
            };
        }

        public static UserDto ToDto(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                UserRole = user.UserRole,
            };
        }
    }
}