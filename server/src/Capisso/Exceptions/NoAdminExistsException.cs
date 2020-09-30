using System;
using System.Runtime.Serialization;

namespace Capisso.Exceptions
{
    [Serializable]
    internal class NoAdminExistsException : Exception
    {
        public NoAdminExistsException()
        {
        }

        public NoAdminExistsException(string message) : base(message)
        {
        }

        public NoAdminExistsException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected NoAdminExistsException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}