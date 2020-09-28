using System;
using System.Runtime.Serialization;

namespace Capisso.Exceptions
{
    [Serializable]
    internal class NonUniqueEmailException : Exception
    {
        public NonUniqueEmailException()
        {
        }

        public NonUniqueEmailException(string message) : base(message)
        {
        }

        public NonUniqueEmailException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected NonUniqueEmailException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}