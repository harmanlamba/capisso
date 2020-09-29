using Capisso.Exceptions;
using Capisso.Repository;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Capisso.Dto;
using Capisso.Mapper;

namespace Capisso.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<string> CreateToken(string userEmail, string jwtSecret)
        {
            var users = await _unitOfWork.UserRepository
                .FindByAsync(u => u.Email == userEmail);

            if (users.Count() != 1)
            {
                throw new EntityNotFoundException();
            }

            var user = users.First();

            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(jwtSecret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userEmail),
                    new Claim(ClaimTypes.Role, user.UserRole.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task<IEnumerable<UserDto>> GetAllUsers()
        {
            var users = await _unitOfWork.UserRepository.GetAllAsync();

            return users.Select(UserMapper.ToDto);
        }
    }
}