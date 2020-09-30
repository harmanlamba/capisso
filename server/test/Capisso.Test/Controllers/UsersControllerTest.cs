﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Capisso.Controllers;
using Capisso.Dto;
using Capisso.Entities;
using Capisso.Exceptions;
using Capisso.Repository;
using Capisso.Services;
using Capisso.Test.Repository;
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
        public async Task TestDeleteExistingUser()
        {
            // arrange
            var user = new User
            {
                Id = 1,
                Email = "123@gmail.com",
                UserRole = UserRole.User,
            };

            _mockUserRepository
                .Setup(x => x.GetByIdAsync(1))
                .Returns(Task.FromResult(user))
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
    }
}