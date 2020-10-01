using Capisso.Dto;
using Capisso.Entities;
using Capisso.Exceptions;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Capisso.Test.Services
{
    public class UserServiceTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<IUserRepository> _mockUserRepository;
        private UserService _userService;

        [SetUp]
        public void Setup()
        {
            _mockUserRepository = new Mock<IUserRepository>();
            _mockUnitOfWork = new MockUnitOfWork
            {
                UserRepository = _mockUserRepository.Object
            };
            _userService = new UserService(_mockUnitOfWork);
        }

        [Test]
        public async Task TestValidEmailToken()
        {
            // arrange
            IEnumerable<User> users = new List<User>
            {
                new User
                {
                    Id = 1,
                    Email = "urzababa@aucklanduni.ac.nz",
                    UserRole = UserRole.Admin
                }
            };
            _mockUserRepository.Setup(x => x.FindByAsync(It.IsAny<Expression<Func<User, bool>>>()))
                .Returns(Task.FromResult(users))
                .Verifiable();

            const string email = "urzababa@aucklanduni.ac.nz"; // user exists
            const string secret = "evKsNMn9EK13T3uyoTlmEa6MVvNFzl0D"; // random secret

            // act
            var token = await _userService.CreateToken(email, secret);

            // assert
            Assert.IsNotNull(token);
            Assert.IsNotEmpty(token);

            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadJwtToken(token);

            Assert.True(decodedToken.Claims.Any(x => x.Value == UserRole.Admin.ToString()));
            _mockUserRepository.Verify();
        }

        [Test]
        public void TestNotValidEmailToken()
        {
            // arrange
            var users = Enumerable.Empty<User>();
            _mockUserRepository
                .Setup(x => x.FindByAsync(It.IsAny<Expression<Func<User, bool>>>()))
                .Returns(Task.FromResult(users))
                .Verifiable();

            const string email = "babs@aucklanduni.ac.nz"; // user doesn't exist
            const string secret = "evKsNMn9EK13T3uyoTlmEa6MVvNFzl0D"; // random secret

            // act and assert
            Assert.ThrowsAsync<EntityNotFoundException>(() => _userService.CreateToken(email, secret));
            _mockUserRepository.Verify();
        }

        [Test]
        public async Task TestGetAllUsers()
        {
            // arrange
            IEnumerable<User> users = new List<User>
            {
                new User
                {
                    Id = 1,
                    Email = "123@gmail.com",
                    UserRole = UserRole.User,
                },
                new User
                {
                    Id = 2,
                    Email = "456@gmail.com",
                    UserRole = UserRole.Admin,
                }
            };
            _mockUserRepository
                .Setup(x => x.GetAllAsync())
                .Returns(Task.FromResult(users))
                .Verifiable();

            // act
            var result = await _userService.GetAllUsers();

            var resultList = result.ToList();

            // assert
            Assert.NotNull(result);
            Assert.AreEqual(2, resultList.Count);
            Assert.AreEqual(1, resultList[0].Id);
            Assert.AreEqual("123@gmail.com", resultList[0].Email);
            Assert.AreEqual(UserRole.User, resultList[0].UserRole);
            Assert.AreEqual(2, resultList[1].Id);
            Assert.AreEqual("456@gmail.com", resultList[1].Email);
            Assert.AreEqual(UserRole.Admin, resultList[1].UserRole);
        }

        [Test]
        public async Task TestDeleteExistingUser()
        {
            // arrange
            var user = new User
            {
                Id = 1,
                Email = "123@gmail.com",
                UserRole = UserRole.Admin,
            };

            var remainingAdmins = new List<User>
            {
                new User
                {
                    Id = 1
                }
            };

            _mockUserRepository
                .Setup(x => x.GetByIdAsync(1))
                .Returns(Task.FromResult(user))
                .Verifiable();

            _mockUserRepository
                .Setup(x => x.FindByAsync(It.IsAny<Expression<Func<User, bool>>>()))
                .Returns(Task.FromResult(remainingAdmins.AsEnumerable()))
                .Verifiable();

            _mockUserRepository.Setup(x => x.Delete(user))
                .Verifiable();

            // act
            await _userService.DeleteUser(1);

            // assert
            _mockUserRepository.Verify();
        }

        [Test]
        public async Task TestDeleteExistingUserWithNoRemainingAdmins()
        {
            // arrange
            var user = new User
            {
                Id = 1,
                Email = "123@gmail.com",
                UserRole = UserRole.Admin,
            };

            var remainingAdmins = new List<User> { };

            _mockUserRepository
                .Setup(x => x.GetByIdAsync(1))
                .Returns(Task.FromResult(user))
                .Verifiable();

            _mockUserRepository
                .Setup(x => x.FindByAsync(It.IsAny<Expression<Func<User, bool>>>()))
                .Returns(Task.FromResult(remainingAdmins.AsEnumerable()))
                .Verifiable();

            _mockUserRepository.Setup(x => x.Delete(user));

            // act and assert
            Assert.ThrowsAsync<NoAdminExistsException>(() => _userService.DeleteUser(1));

            _mockUserRepository.Verify();
            _mockUserRepository.Verify(x => x.Delete(It.IsAny<User>()), Times.Never);
        }

        [Test]
        public void TestDeleteNonExistingUser()
        {
            // arrange
            _mockUserRepository
                .Setup(x => x.GetByIdAsync(1))
                .Returns(Task.FromResult<User>(null))
                .Verifiable();

            // act and assert
            Assert.ThrowsAsync<EntityNotFoundException>(() => _userService.DeleteUser(1));

            _mockUserRepository.Verify();
            _mockUserRepository.Verify(x => x.Delete(It.IsAny<User>()), Times.Never);
        }

        [Test]
        public async Task TestUpdateUserValidInput()
        {
            var userDto = new UserDto
            {
                Id = 1,
                Email = "p1@aucklanduni.ac.nz",
                UserRole = UserRole.User
            };

            var remainingAdmins = new List<User>
            {
                new User { Id = 2 }
            };

            _mockUserRepository.Setup(x => x.FindByAsync(It.IsAny<Expression<Func<User, bool>>>())).Returns(Task.FromResult(remainingAdmins.AsEnumerable()));
            _mockUserRepository.Setup(x => x.Update(It.IsAny<User>()));

            // Act
            await _userService.UpdateUser(userDto);

            // Assert
            _mockUserRepository.Verify();
        }

        [Test]
        public async Task TestUpdateUserWithNoRemainingAdmins()
        {
            var userDto = new UserDto
            {
                Id = 1,
                Email = "someonehasanurzababafetish@aucklanduni.ac.nz",
                UserRole = UserRole.User
            };

            var remainingAdmins = new List<User> { };

            _mockUserRepository.Setup(x => x.FindByAsync(It.IsAny<Expression<Func<User, bool>>>())).Returns(Task.FromResult(remainingAdmins.AsEnumerable()));
            _mockUserRepository.Setup(x => x.Update(It.IsAny<User>()));

            // Act
            Assert.ThrowsAsync<NoAdminExistsException>(() => _userService.UpdateUser(userDto));

            // Assert
            _mockUserRepository.Verify(x => x.FindByAsync(It.IsAny<Expression<Func<User, bool>>>()), Times.Once);
            _mockUserRepository.Verify(x => x.Update(It.IsAny<User>()), Times.Never);
        }
    }
}