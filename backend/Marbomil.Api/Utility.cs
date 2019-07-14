using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api
{
    public static class Utility
    {
        public static byte[] ConvertFromBase64(string contentBase64)
        {
            byte[] content = null;

            if (!string.IsNullOrWhiteSpace(contentBase64))
            {
                content = Convert.FromBase64String(contentBase64);
            }

            return content;
        }

        public static string ConvertToBase64(byte[] content)
        {
            string contentBase64 = string.Empty;

            if (content != null)
            {
                contentBase64 = Convert.ToBase64String(content);
            }

            return contentBase64;
        }
    }
}
