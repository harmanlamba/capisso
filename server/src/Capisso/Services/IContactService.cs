using Capisso.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Services
{
    public interface IContactService
    {
        Task<int> CreateContact(ContactDto contactDto);
    }
}
