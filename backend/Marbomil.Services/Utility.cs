using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Services
{
    public static class Utility
    {
        public static byte[] ReadFile(string relativeFileUrl)
        {
            byte[] fileContent = null;

            if (!string.IsNullOrWhiteSpace(relativeFileUrl))
            {
                string baseDirectory = Environment.CurrentDirectory;
                string filepath = Path.Combine(baseDirectory, relativeFileUrl);

                if (File.Exists(filepath))
                {
                    fileContent = File.ReadAllBytes(filepath);
                }
            }

            return fileContent;
        }

        public static string ReadFileExtension(string relativeFileUrl)
        {
            string fileExtension = string.Empty;

            if (!string.IsNullOrWhiteSpace(relativeFileUrl))
            {
                string baseDirectory = Environment.CurrentDirectory;
                string filepath = Path.Combine(baseDirectory, relativeFileUrl);

                if (File.Exists(filepath))
                {
                    FileInfo fileInfo = new FileInfo(filepath);

                    fileExtension = fileInfo.Extension;
                }
            }

            return fileExtension;
        }
    }
}
