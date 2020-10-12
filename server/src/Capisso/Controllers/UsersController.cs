using Capisso.Dto;
using Capisso.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Capisso.Exceptions;
using Google.Apis.Auth;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace Capisso.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public UsersController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        /// <summary>
        /// Attempts to login the user with details from the given oneTimeToken.
        /// </summary>
        /// <param name="onetimeToken">The Google-issued Json web token to login with.</param>
        /// <returns>
        /// An Ok response in the case that the request was successful, with the login data returned in the body.
        /// An UnauthorizedResult response in the case that the JWT is invalid or a user with the 
        /// email was not found.
        /// </returns>
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<LoginDto>> GoogleLogin([FromBody] OneTimeTokenDto onetimeToken)
        {
            LoginDto loginDto;

            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(onetimeToken.TokenId,
                    new GoogleJsonWebSignature.ValidationSettings());

                loginDto = new LoginDto
                {
                    FirstName = payload.GivenName,
                    LastName = payload.FamilyName,
                    PictureUri = payload.Picture,
                    JWTToken = await _userService.CreateToken(payload.Email, _configuration["JwtSecret"])
                };
            }
            catch (EntityNotFoundException)
            {
                return new UnauthorizedResult();
            }
            catch (AggregateException)
            {
                return new UnauthorizedResult();
            }

            return Ok(loginDto);
        }

        /// <summary>
        /// Gets a list of all users.
        /// </summary>
        /// <returns>
        /// An Ok response in the case that the request was successful, with the body containing
        /// the list of all users.
        /// </returns>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();

            return Ok(users);
        }

        /// <summary>
        /// Deletes the user with the given userId.
        /// </summary>
        /// <param name="userId">The id of the user to be deleted.</param>
        /// <returns>
        /// A NoContent response in the case that the user was successfully deleted.
        /// A NotFound response in the case where no user with the given id is found.
        /// A BadRequest response in the case where the user cannot be deleted 
        /// because no other admins exist.
        /// </returns>
        [HttpDelete]
        [Route("{userId:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteUser(int userId)
        {
            try
            {
                await _userService.DeleteUser(userId);
            }
            catch (EntityNotFoundException)
            {
                return NotFound();
            }
            catch (NoAdminExistsException)
            {
                return BadRequest();
            }

            return NoContent();
        }

        /// <summary>
        /// Adds a user with the data in the given userDto object.
        /// </summary>
        /// <param name="userDto">Contains the data for the new user to be created.</param>
        /// <returns>
        /// A Created response in the case of the user being successfully created. 
        /// A BadRequest response in the case that the provided email is invalid or already exists.
        /// </returns>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> AddUser(UserDto userDto)
        {
            int userId;

            try
            {
                userId = await _userService.AddUser(userDto);
            }
            catch (InvalidEmailException)
            {
                return BadRequest();
            }
            catch (DuplicateEmailException)
            {
                return BadRequest();
            }

            return Created($"/users/{userId}", new CreatedDto { Id = userId });
        }

        /// <summary>
        /// Updates the user with the given id, with the data in the given userDto.
        /// </summary>
        /// <param name="userDto">Contains the new data to update the user with.</param>
        /// <param name="userId">The id of the user to be updated.</param>
        /// <returns>
        /// A NoContent response in the case that the update was successful.
        /// A BadRequest response in the case that the given user ids do not match, or
        /// the user cannot be demoted because no other admin exists.
        /// </returns>
        [HttpPut]
        [Route("{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateUser([FromBody] UserDto userDto, [FromRoute] int userId)
        {
            if (userDto.Id != userId)
            {
                return BadRequest();
            }

            try
            {
                await _userService.UpdateUser(userDto);
            }
            catch (NoAdminExistsException)
            {
                return BadRequest();
            }

            return NoContent();
        }

        /// <summary>
        /// Adds a given collection of users.
        /// </summary>
        /// <param name="userDtos">A collection of users and their details to be created.</param>
        /// <returns>
        /// A Created response in the case of all users being successfully created. 
        /// A BadRequest response in the case that one of the provided emails is invalid, already exists
        /// or is given more than once.
        /// </returns>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("collection")]
        public async Task<ActionResult> AddUserCollection(UserDto[] userDtos)
        {
            try
            {
                await _userService.AddUserCollection(userDtos);
            }
            catch (InvalidEmailException)
            {
                return BadRequest();
            }
            catch (DuplicateEmailException)
            {
                return BadRequest();
            }

            return Created("/users/collection", new CreatedDto { });
        }
    }
}