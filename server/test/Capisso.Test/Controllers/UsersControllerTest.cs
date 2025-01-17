﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Capisso.Controllers;
using Capisso.Dto;
using Capisso.Entities;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace Capisso.Test.Controllers
{
    public class UsersControllerTest
    {
        private MockUnitOfWork _mockUnitOfWork;
        private Mock<IUserRepository> _mockUserRepository;
        private UserService _userService;
        private UsersController _usersController;

        [SetUp]
        public void Setup()
        {
            _mockUserRepository = new Mock<IUserRepository>();
            _mockUnitOfWork = new MockUnitOfWork
            {
                UserRepository = _mockUserRepository.Object
            };
            _userService = new UserService(_mockUnitOfWork);
            _usersController = new UsersController(null, _userService);
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
            var response = await _usersController.GetAllUsers();

            Assert.IsInstanceOf<OkObjectResult>(response.Result);
            var okResult = response.Result as OkObjectResult;

            Assert.IsInstanceOf<IEnumerable<UserDto>>(okResult.Value);
            var resultObject = okResult.Value as IEnumerable<UserDto>;
            var resultList = resultObject.ToList();

            // assert
            Assert.AreEqual(2, resultList.Count);
            Assert.AreEqual(1, resultList[0].Id);
            Assert.AreEqual("123@gmail.com", resultList[0].Email);
            Assert.AreEqual(UserRole.User, resultList[0].UserRole);
            Assert.AreEqual(2, resultList[1].Id);
            Assert.AreEqual("456@gmail.com", resultList[1].Email);
            Assert.AreEqual(UserRole.Admin, resultList[1].UserRole);
        }

        [Test]
        public async Task TestAddValidEmailUser()
        {
            // arrange
            var userDto = new UserDto { Email = "test@aucklanduni.ac.nz", UserRole = UserRole.User };

            _mockUserRepository
                .Setup(x => x.InsertAsync(It.IsAny<User>()))
                .Returns(Task.FromResult(1));

            _mockUserRepository.Setup(x => x.FindByAsync(It.IsAny<Expression<System.Func<Capisso.Entities.User, bool>>>())).Returns(Task.FromResult(Enumerable.Empty<User>()));

            // act
            ActionResult<CreatedDto> response = await _usersController.AddUser(userDto);

            // assert
            Assert.IsInstanceOf<CreatedResult>(response.Result);
            CreatedResult createdResult = response.Result as CreatedResult;
            Assert.AreEqual(201, createdResult.StatusCode);

            CreatedDto value = createdResult.Value.As<CreatedDto>();
            Assert.IsNotNull(value);
            Assert.AreEqual(0, value.Id);

            _mockUserRepository.Verify(x => x.InsertAsync(It.IsAny<User>()), Times.Once);
        }

        [Test]
        public async Task TestAddInvalidEmailUser()
        {
            // arrange
            var userDto = new UserDto { Email = "test@gmail.com", UserRole = UserRole.User };

            // act
            ActionResult<CreatedDto> response = await _usersController.AddUser(userDto);

            // assert
            Assert.IsInstanceOf<BadRequestResult>(response.Result);

            _mockUserRepository.Verify(x => x.InsertAsync(It.IsAny<User>()), Times.Never);
        }

        [Test]
        public async Task TestAddDuplicatedUser()
        {
            // arrange
            var userDto = new UserDto { Email = "test@aucklanduni.ac.nz", UserRole = UserRole.User };
            IEnumerable<User> users = new List<User>
            {
                new User
                {
                    Id = 1,
                    Email = "test@aucklanduni.ac.nz",
                    UserRole = UserRole.User,
                },
            };

            _mockUserRepository.Setup(x => x.FindByAsync(It.IsAny<Expression<System.Func<Capisso.Entities.User, bool>>>())).Returns(Task.FromResult(users));

            // act
            ActionResult<CreatedDto> response = await _usersController.AddUser(userDto);

            // assert
            Assert.IsInstanceOf<BadRequestResult>(response.Result);

            _mockUserRepository.Verify(x => x.InsertAsync(It.IsAny<User>()), Times.Never);
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
            var response = await _usersController.DeleteUser(1);

            // assert
            Assert.IsInstanceOf<NoContentResult>(response);
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

            // act
            var response = await _usersController.DeleteUser(1);

            // assert
            Assert.IsInstanceOf<BadRequestResult>(response);
            _mockUserRepository.Verify();
            _mockUserRepository.Verify(x => x.Delete(It.IsAny<User>()), Times.Never);
        }

        [Test]
        public async Task TestDeleteNonExistingUser()
        {
            // arrange
            _mockUserRepository
                .Setup(x => x.GetByIdAsync(1))
                .Returns(Task.FromResult<User>(null))
                .Verifiable();

            // act
            var response = await _usersController.DeleteUser(1);

            // assert
            Assert.IsInstanceOf<NotFoundResult>(response);
            _mockUserRepository.Verify();
            _mockUserRepository.Verify(x => x.Delete(It.IsAny<User>()), Times.Never);
        }

        [Test]
        public async Task TestUpdateUserInvalidInput()
        {
            var userDto = new UserDto
            {
                Id = 2,
                Email = "erc@aucklanduni.ac.nz",
                UserRole = UserRole.User
            };

            _mockUserRepository.Setup(x => x.Update(It.IsAny<User>()));

            // Act
            ActionResult<NonActionAttribute> response = await _usersController.UpdateUser(userDto, 1);

            // Assert
            Assert.IsInstanceOf<BadRequestResult>(response.Result);

            _mockUserRepository.Verify(x => x.Update(It.IsAny<User>()), Times.Never);
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
                new User { }
            };

            _mockUserRepository.Setup(x => x.FindByAsync(It.IsAny<Expression<Func<User, bool>>>())).Returns(Task.FromResult(remainingAdmins.AsEnumerable()));
            _mockUserRepository.Setup(x => x.Update(It.IsAny<User>()));

            // Act
            ActionResult<NonActionAttribute> response = await _usersController.UpdateUser(userDto, 1);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(response.Result);

            _mockUserRepository.Verify(x => x.FindByAsync(It.IsAny<Expression<Func<User, bool>>>()), Times.Once);
            _mockUserRepository.Verify(x => x.Update(It.IsAny<User>()), Times.Once);
        }

        [Test]
        public async Task TestUpdateUserWithNoRemainingAdmins()
        {
            var userDto = new UserDto
            {
                Id = 1,
                Email = "p1@aucklanduni.ac.nz",
                UserRole = UserRole.User
            };

            var remainingAdmins = new List<User> { };

            _mockUserRepository.Setup(x => x.FindByAsync(It.IsAny<Expression<Func<User, bool>>>())).Returns(Task.FromResult(remainingAdmins.AsEnumerable()));
            _mockUserRepository.Setup(x => x.Update(It.IsAny<User>()));

            // Act
            ActionResult<NonActionAttribute> response = await _usersController.UpdateUser(userDto, 1);

            // Assert
            Assert.IsInstanceOf<BadRequestResult>(response.Result);

            _mockUserRepository.Verify(x => x.FindByAsync(It.IsAny<Expression<Func<User, bool>>>()), Times.Once);
            _mockUserRepository.Verify(x => x.Update(It.IsAny<User>()), Times.Never);
        }

        [Test]
        public async Task TestAddValidUserCollection()
        {
            // arrange
            var userDtos = new UserDto[] {
                new UserDto { Email = "test@aucklanduni.ac.nz", UserRole = UserRole.User },
                new UserDto { Email = "test1@aucklanduni.ac.nz", UserRole = UserRole.User },
                new UserDto { Email = "test2@aucklanduni.ac.nz", UserRole = UserRole.Admin },
                new UserDto { Email = "test3@aucklanduni.ac.nz", UserRole = UserRole.User }
            };

            var existingUsers = new User[] {
                new User { Email = "test4@aucklanduni.ac.nz", UserRole = UserRole.User },
                new User { Email = "test5@aucklanduni.ac.nz", UserRole = UserRole.User },
                new User { Email = "test6@aucklanduni.ac.nz", UserRole = UserRole.User }
            };

            _mockUserRepository
                .Setup(x => x.InsertManyAsync(It.IsAny<IEnumerable<User>>()))
                .Returns(Task.FromResult(1));

            _mockUserRepository.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(existingUsers.AsEnumerable()));

            // act
            ActionResult<CreatedDto> response = await _usersController.AddUserCollection(userDtos);

            // assert
            Assert.IsInstanceOf<CreatedResult>(response.Result);
            CreatedResult createdResult = response.Result as CreatedResult;
            Assert.AreEqual(201, createdResult.StatusCode);

            CreatedDto value = createdResult.Value.As<CreatedDto>();

            _mockUserRepository.Verify(x => x.InsertManyAsync(It.IsAny<IEnumerable<User>>()), Times.Once);
        }

        [Test]
        public async Task TestAddInvalidUserCollection()
        {
            // arrange
            var userDtos = new UserDto[] {
                new UserDto { Email = "test@gmail.ac.nz", UserRole = UserRole.User },
                new UserDto { Email = "test1@aucklanduni.ac.nz", UserRole = UserRole.User },
                new UserDto { Email = "test2@aucklanduni.ac.nz", UserRole = UserRole.Admin },
                new UserDto { Email = "test3@aucklanduni.ac.nz", UserRole = UserRole.User }
            };

            // act
            ActionResult<CreatedDto> response = await _usersController.AddUserCollection(userDtos);

            // assert
            Assert.IsInstanceOf<BadRequestResult>(response.Result);

            _mockUserRepository.Verify(x => x.InsertManyAsync(It.IsAny<IEnumerable<User>>()), Times.Never);
        }

        [Test]
        public async Task TestAddNewDuplicatedUserCollection()
        {
            // arrange
            var userDtos = new UserDto[] {
                new UserDto { Email = "test@aucklanduni.ac.nz", UserRole = UserRole.User },
                new UserDto { Email = "test3@aucklanduni.ac.nz", UserRole = UserRole.User },
                new UserDto { Email = "test1@aucklanduni.ac.nz", UserRole = UserRole.User },
                new UserDto { Email = "TEST3@aucklanduni.ac.nz", UserRole = UserRole.Admin }
            };

            // act
            ActionResult<CreatedDto> response = await _usersController.AddUserCollection(userDtos);

            // assert
            Assert.IsInstanceOf<BadRequestResult>(response.Result);

            _mockUserRepository.Verify(x => x.InsertManyAsync(It.IsAny<IEnumerable<User>>()), Times.Never);
        }

        [Test]
        public async Task TestAddExistingDuplicatedUserCollection()
        {
            // arrange
            var userDtos = new UserDto[] {
                new UserDto { Email = "test@aucklanduni.ac.nz", UserRole = UserRole.User },
                new UserDto { Email = "test1@aucklanduni.ac.nz", UserRole = UserRole.User },
                new UserDto { Email = "test2@aucklanduni.ac.nz", UserRole = UserRole.User }
            };
            IEnumerable<User> existingUsers = new List<User>
            {
                new User {Email = "test@aucklanduni.ac.nz", UserRole = UserRole.Admin,},
            };

            _mockUserRepository.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(existingUsers));

            // act
            ActionResult<CreatedDto> response = await _usersController.AddUserCollection(userDtos);

            // assert
            Assert.IsInstanceOf<BadRequestResult>(response.Result);

            _mockUserRepository.Verify(x => x.InsertManyAsync(It.IsAny<IEnumerable<User>>()), Times.Never);
        }
    }
}