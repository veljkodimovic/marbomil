using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Marbomil.Infrastructure.Enums;

namespace Marbomil.Infrastructure.Files
{
    public class FileManager : IFileManager
    {
        private readonly string mainFolderName = "EntitiesFiles";

        #region Private, protected methods

        /// <summary>
        /// Creates main folder, if not exists, in which all Entities files are stored
        /// </summary>
        private void CreateMainEntitiesFilesFolderIfNotExists()
        {
            string rootFolder = Environment.CurrentDirectory;
            string mainFolderPath = Path.Combine(rootFolder, this.mainFolderName);

            if (!Directory.Exists(mainFolderPath))
            {
                Directory.CreateDirectory(mainFolderPath);
            }
        }

        /// <summary>
        /// Creates entity files folder, if not exists, in which all files of specific type of Entity are stored
        /// </summary>
        /// <param name="folder">Folder name</param>
        private void CreateEntityFilesFolderIfNotExists(MarbomilFolders folder)
        {
            string rootFolder = Environment.CurrentDirectory;
            string entityFilesFolderPath = Path.Combine(rootFolder, this.mainFolderName, $"{folder}");

            if (!Directory.Exists(entityFilesFolderPath))
            {
                Directory.CreateDirectory(entityFilesFolderPath);
            }
        }

        /// <summary>
        /// Creates entity files folder, if not exists, for the specific instance of the Entity, determined with passed Id.
        /// All files for the specific instance of the Entity are stored in that folder
        /// </summary>
        /// <param name="id">Id of the Entity for which folder is being created</param>
        /// <param name="folder">Folder name of the type to which Entity belongs to</param>
        private void CreateEntityIdFilesFolderIfNotExists(int id, MarbomilFolders folder)
        {
            string rootFolder = Environment.CurrentDirectory;
            string entityIdFilesFolderPath = Path.Combine(rootFolder, this.mainFolderName, $"{folder}", $"{id}");

            if (!Directory.Exists(entityIdFilesFolderPath))
            {
                Directory.CreateDirectory(entityIdFilesFolderPath);
            }
        }

        /// <summary>
        /// Creates all needed folders that are in the Entity folder path for saving files that are related to the Entity 
        /// which id is passed
        /// </summary>
        /// <param name="id">Id of the Entity for which folders are being created</param>
        /// <param name="folder">Folder name of the type to which Entity belongs to</param>
        private void CreateFoldersToSaveEntityFileIfNotExists(int id, MarbomilFolders folder)
        {
            this.CreateMainEntitiesFilesFolderIfNotExists();
            this.CreateEntityFilesFolderIfNotExists(folder);
            this.CreateEntityIdFilesFolderIfNotExists(id, folder);
        }

        #endregion

        #region IFileManager implementations

        public string CreateEntityFile(int id, byte[] fileContent, string fileExtension, MarbomilFolders folder)
        {
            this.CreateFoldersToSaveEntityFileIfNotExists(id, folder);

            string relativeFilePath = Path.Combine(this.mainFolderName, $"{folder}", $"{id}", $"{Guid.NewGuid()}{fileExtension}");
            string absoluteFilePath = Path.Combine(Environment.CurrentDirectory, relativeFilePath);

            File.WriteAllBytes(absoluteFilePath, fileContent);

            return relativeFilePath.Replace("\\", "/");
        }

        public void DeleteFile(string relativePath)
        {
            string filepath = Path.Combine(Environment.CurrentDirectory, relativePath);

            if (File.Exists(filepath))
            {
                File.Delete(filepath);
            }
        }

        public void DeleteEntityFilesFolder(int id, MarbomilFolders folder)
        {
            string folderpath = Path.Combine(Environment.CurrentDirectory, $"{this.mainFolderName}", $"{folder}", $"{id}");

            if (Directory.Exists(folderpath))
            {
                Directory.Delete(folderpath, true);
            }
        }

        public string UpdateEntityFile(string fileRelativePath, byte[] fileContent, string fileExtension)
        {
            string newFileRelativePath = string.Empty;
            string filepath = Path.Combine(Environment.CurrentDirectory, fileRelativePath);

            if (File.Exists(filepath))
            {
                FileInfo fileInfo = new FileInfo(filepath);
                string newFilename = $"{Path.GetFileNameWithoutExtension(filepath)}{fileExtension}";

                filepath = Path.Combine(fileInfo.Directory.FullName, newFilename);                

                File.Delete(filepath);
                File.WriteAllBytes(filepath, fileContent);
            }
            else
            {
                File.WriteAllBytes(filepath, fileContent);
            }

            newFileRelativePath = filepath.Replace($"{Environment.CurrentDirectory}\\", string.Empty);

            return newFileRelativePath.Replace("\\", "/");
        }

        public bool ExistsEntityFile(string fileRelativePath)
        {
            bool exists = false;

            if (!string.IsNullOrWhiteSpace(fileRelativePath))
            {
                string filepath = Path.Combine(Environment.CurrentDirectory, fileRelativePath);

                exists = File.Exists(filepath);
            }

            return exists;
        }

        #endregion
    }
}
