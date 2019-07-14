using Marbomil.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Files
{
    public interface IFileManager
    {
        /// <summary>
        /// Create passed file content into new file
        /// </summary>
        /// <param name="id">Id of the Entity to whcih file is related to</param>
        /// <param name="fileContent">Contains file content which needs to be saved</param>
        /// <param name="fileExtension">Contains extension of the file which needs to be saved</param>
        /// <param name="folder">Folder in which file needs to be saved</param>
        /// <returns>Return the relative URI path of the File in which passed file content is saved</returns>
        string CreateEntityFile(int id, byte[] fileContent, string fileExtension, MarbomilFolders folder);

        /// <summary>
        /// Update content of the existing file
        /// </summary>
        /// <param name="fileRelativePath">Relative path of the file</param>
        /// <param name="fileContent">Contains file content for update</param>
        /// <param name="fileExtension">Contains extension of the file which needs to be saved</param>
        /// <returns></returns>
        string UpdateEntityFile(string fileRelativePath, byte[] fileContent, string fileExtension);

        /// <summary>
        /// Deletes file which relative path is passed
        /// </summary>
        /// <param name="relativePath">Relative path of the file</param>
        void DeleteFile(string relativePath);

        /// <summary>
        /// Deletes entity folder with all files in it
        /// </summary>
        /// <param name="id">Id of the Entity</param>
        /// <param name="folder">Folder in which files of the Entities with the same type are stored</param>
        void DeleteEntityFilesFolder(int id, MarbomilFolders folder);

        /// <summary>
        /// Checks if entity file exists, which relative path is passed
        /// </summary>
        /// <param name="fileRelativePath">Relative file path</param>
        /// <returns></returns>
        bool ExistsEntityFile(string fileRelativePath);
    }
}
