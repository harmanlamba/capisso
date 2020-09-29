﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Dto
{
    public class LoginDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JWTToken { get; set; }
        public string PictureUri { get; set; }
    }
}
