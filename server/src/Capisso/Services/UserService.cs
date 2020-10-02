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
using System.Text.RegularExpressions;
using Capisso.Entities;

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

        public async Task DeleteUser(int id)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(id) ??
                       throw new EntityNotFoundException($"User with id <{id}> not found");

            if (user.UserRole.Equals(UserRole.Admin) && !(await CheckAdminExistsAfterUserRemoval(user)))
            {
                throw new NoAdminExistsException();
            }

            _unitOfWork.UserRepository.Delete(user);
            await _unitOfWork.SaveAsync();
        }

        public async Task<int> AddUser(UserDto userDto)
        {
            var user = UserMapper.FromDto(userDto);
            string pattern = @"^([\w-.]+)@aucklanduni.ac.nz$";

            Match m = Regex.Match(user.Email, pattern, RegexOptions.IgnoreCase);

            if (!m.Success)
            {
                throw new InvalidEmailException();
            }

            var dbUser = await _unitOfWork.UserRepository.FindByAsync(u => String.Equals(u.Email.ToLower(), user.Email.ToLower()));

            if (dbUser.Any())
            {
                throw new DuplicateEmailException();
            }

            await _unitOfWork.UserRepository.InsertAsync(user);
            await _unitOfWork.SaveAsync();

            return user.Id;
        }

        public async Task UpdateUser(UserDto userDto)
        {
            var user = UserMapper.FromDto(userDto);

            if (!user.UserRole.Equals(UserRole.Admin) && !(await CheckAdminExistsAfterUserRemoval(user)))
            {
                throw new NoAdminExistsException();
            }

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveAsync();
        }

        public async Task AddUserCollection(UserDto[] userDtos)
        {
            var users = userDtos.Select(u => UserMapper.FromDto(u));
            string pattern = @"^([\w-.]+)@aucklanduni.ac.nz$";

            foreach (var user in users)
            {
                Match m = Regex.Match(user.Email, pattern, RegexOptions.IgnoreCase);

                if (!m.Success)
                {
                    throw new InvalidEmailException();
                }
            }

            var userEmails = users.Select(u => u.Email);

            if (userEmails.Distinct().Count() != users.Count())
            {
                throw new DuplicateEmailException();
            }

            var duplicateEmails = (await _unitOfWork.UserRepository.GetAllAsync()).Select(u => u.Email).Intersect(userEmails, StringComparer.InvariantCultureIgnoreCase);

            if (duplicateEmails.Any())
            {
                throw new DuplicateEmailException();
            }

            await _unitOfWork.UserRepository.InsertManyAsync(users);
            await _unitOfWork.SaveAsync();
        }

        private async Task<bool> CheckAdminExistsAfterUserRemoval(User removedUser)
        {
            var remainingAdminList = await _unitOfWork.UserRepository
                    .FindByAsync(u => u.UserRole.Equals(UserRole.Admin) && !String.Equals(removedUser.Email.ToLower(), u.Email.ToLower()));

            return remainingAdminList.Any();
        }
    }
}