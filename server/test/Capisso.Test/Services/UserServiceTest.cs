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
    }
}