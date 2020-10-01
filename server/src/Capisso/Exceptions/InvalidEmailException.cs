using System;
using System.Runtime.Serialization;

namespace Capisso.Exceptions
{
    [Serializable]
    public class InvalidEmailException : Exception
    {
        public InvalidEmailException()
        {
        }

        public InvalidEmailException(string message) : base(message)
        {
        }

        public InvalidEmailException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected InvalidEmailException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}