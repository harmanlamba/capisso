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
using System.Linq.Expressions;
using System.Text;
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
            IEnumerable<User> users = new List<User> {
                new User
                {
                    Id = 1,
                    Email = "urzababa@aucklanduni.ac.nz",
                    UserRole = UserRole.Admin
                }
            };
            _mockUserRepository.Setup(x => x.FindByAsync(It.IsAny<Expression<System.Func<Capisso.Entities.User, bool>>>())).Returns(Task.FromResult(users));


            // act
            var token = await _userService.CreateToken("urzababa@aucklanduni.ac.nz", "evKsNMn9EK13T3uyoTlmEa6MVvNFzl0D"); //Random Jwt secret

            //assert
            Assert.IsNotEmpty(token);
        }

        [Test]
        public async Task TestNotValidEmailToken()
        {
            // arrange
            IEnumerable<User> users = new List<User>
            {

            };
            _mockUserRepository.Setup(x => x.FindByAsync(It.IsAny<Expression<System.Func<Capisso.Entities.User, bool>>>())).Returns(Task.FromResult(users));

            // act
            try
            {
                var token = await _userService.CreateToken("babs@aucklanduni.ac.nz", "evKsNMn9EK13T3uyoTlmEa6MVvNFzl0D"); //Random Jwt secret
            }
            catch (EntityNotFoundException)
            {
                Assert.Pass();

            }
            Assert.Fail();
        }
    }
}
