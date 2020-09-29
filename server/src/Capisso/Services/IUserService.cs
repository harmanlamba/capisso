using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Services
{
    public interface IUserService
    {
        Task<string> CreateToken(string userEmail, string jwtSecret);
    }
}
