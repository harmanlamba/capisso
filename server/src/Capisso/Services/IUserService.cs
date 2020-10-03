using System.Collections.Generic;
using System.Threading.Tasks;
using Capisso.Dto;

namespace Capisso.Services
{
    public interface IUserService
    {
        Task<string> CreateToken(string userEmail, string jwtSecret);
        Task<IEnumerable<UserDto>> GetAllUsers();
        Task DeleteUser(int id);
        Task<int> AddUser(UserDto userDto);
        Task UpdateUser(UserDto userDto);
        Task AddUserCollection(UserDto[] userDtos);
    }
}