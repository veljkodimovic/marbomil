using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Logging
{
    internal class Logger : ILogger
    {
        private static NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();


        #region Private methods

        private string SerializeToJson<T>(T value) where T : class
        {
            return JsonConvert.SerializeObject(value, Formatting.Indented);
        }

        #endregion

        #region ILogger implementations

        public void Debug(string message)
        {
            logger.Debug(message);
        }

        public void Debug<T>(string message, T data) where T : class
        {
            logger.Debug(message);
            logger.Debug(this.SerializeToJson(data));
        }

        public void Error(string message)
        {
            logger.Error(message);
        }

        public void Error<T>(string message, T data) where T : class
        {
            logger.Error($"{message}{Environment.NewLine}{this.SerializeToJson(data)}");
        }

        public void Error(string message, Exception ex)
        {
            logger.Error(ex, message);
        }

        public void Error<T>(string message, T data, Exception ex) where T : class
        {
            logger.Error(ex, $"{message}{Environment.NewLine}{this.SerializeToJson(data)}");
        }

        public void Information(string message)
        {
            logger.Info(message);
        }

        public void Information<T>(string message, T data) where T : class
        {
            logger.Info(message);
            logger.Info(this.SerializeToJson(data));
        }

        public void Warning(string message)
        {
            logger.Warn(message);
        }

        public void Warning<T>(string message, T data) where T : class
        {
            logger.Warn(message);
            logger.Warn(this.SerializeToJson(data));
        }

        public void Warning(string message, Exception ex)
        {
            logger.Warn(ex, message);
        }

        public void Warning<T>(string message, T data, Exception ex) where T : class
        {
            logger.Warn(ex, $"{message}{Environment.NewLine}{this.SerializeToJson(data)}");
        }

        #endregion
    }
}
