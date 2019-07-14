using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Logging
{
    public interface ILogger
    {
        void Debug(string message);
        void Debug<T>(string message, T data) where T : class;

        void Information(string message);
        void Information<T>(string message, T data) where T : class;

        void Warning(string message);
        void Warning<T>(string message, T data) where T : class;
        void Warning(string message, Exception ex);
        void Warning<T>(string message, T data, Exception ex) where T : class;

        void Error(string message);
        void Error<T>(string message, T data) where T : class;
        void Error(string message, Exception ex);
        void Error<T>(string message, T data, Exception ex) where T : class;
    }
}
