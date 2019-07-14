using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Logging
{
    public static class LoggerFactory
    {
        private static ILogger logger = new Logger();

        public static ILogger GetLogger()
        {
            return logger;
        }
    }
}
