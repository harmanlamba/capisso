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
    [Route("[controller]")]
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

        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();

            return Ok(users);
        }
    }
}