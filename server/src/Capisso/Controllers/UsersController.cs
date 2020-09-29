using Capisso.Dto;
using Capisso.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Capisso.Exceptions;
using System.Collections;
using System.Collections.Generic;
using Google.Apis.Auth;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
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
        public async Task<ActionResult<UserDto>> GoogleLogin([FromBody] OneTimeTokenDto onetimeToken)
        {
            UserDto userDto;

            try
            {
                GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(onetimeToken.TokenId, new GoogleJsonWebSignature.ValidationSettings());

                userDto = new UserDto
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

            return Ok(userDto);
        }
    }
}
