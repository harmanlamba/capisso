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
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
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
                    FirstName = payload.Name,
                    LastName = payload.FamilyName,
                    PictureUri = payload.Picture,
                    JWTToken = CreateToken(payload.Email)
                };
            }
            catch (Exception)
            {
                return new UnauthorizedResult();
            }

            return Ok(userDto);
        }

        private string CreateToken(string userEmail)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            byte[] key = Encoding.ASCII.GetBytes(_configuration["JwtSecret"]);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userEmail)
                    //TODO: Add secondary claim based on user role when checked with whitelist
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

    }
}
