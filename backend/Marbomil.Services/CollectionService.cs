using AutoMapper.QueryableExtensions;
using Marbomil.Infrastructure;
using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Enums;
using Marbomil.Infrastructure.Files;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Services
{
    public class CollectionService : ServiceBase, ICollectionService
    {
        private readonly IRepository repository;
        private readonly IFileManager fileManager;

        public CollectionService(IRepository repository, IFileManager fileManager)
        {
            this.repository = repository;
            this.fileManager = fileManager;
        }


        #region ICollectionService implementations

        public void Create(CollectionCrud collectionCrud)
        {
            Collection collection = this.mapper.Map<Collection>(collectionCrud);
            this.repository.Save<Collection>(collection);
            this.repository.SaveChanges();

            if (collectionCrud.Image != null
                &&
                collectionCrud.Image.Length > 0)
            {
                string imageRelativePath = this.fileManager.CreateEntityFile(collection.Id, collectionCrud.Image, collectionCrud.ImageExtension, MarbomilFolders.Collection);
                collection.ImageUrl = imageRelativePath;

                this.repository.Save<Collection>(collection);
            }

            if (collectionCrud.ImageCrop != null
                &&
                collectionCrud.ImageCrop.Length > 0)
            {
                string imageCropRelativePath = this.fileManager.CreateEntityFile(collection.Id, collectionCrud.ImageCrop, collectionCrud.ImageExtension, MarbomilFolders.Collection);

                collection.ImageCropUrl = imageCropRelativePath;
                this.repository.Save<Collection>(collection);
            }
            
            this.repository.SaveChanges();
        }

        public void Delete(int id)
        {
            this.repository.Delete<Collection>(id);
            this.fileManager.DeleteEntityFilesFolder(id, MarbomilFolders.Collection);
            this.repository.SaveChanges();
        }

        public CollectionCrud Edit(int id)
        {
            Collection collection = this.repository.Select<Collection>(id);

            return this.mapper.Map<CollectionCrud>(collection);
        }

        public CollectionView Select(int id)
        {
            Collection collection = this.repository.Select<Collection>(id);

            return this.mapper.Map<CollectionView>(collection);
        }

        public IEnumerable<CollectionView> Select()
        {
            return this.repository.Select<Collection>()
                                  .ProjectTo<CollectionView>(this.mapper.ConfigurationProvider);
        }

        public void Update(CollectionCrud collectionCrud)
        {
            Collection collection = this.repository.Select<Collection>(collectionCrud.Id);
            collection = this.mapper.Map<CollectionCrud, Collection>(collectionCrud, collection);

            if (collectionCrud.Image != null)
            {
                collection.ImageUrl = !this.fileManager.ExistsEntityFile(collection.ImageUrl) ?
                    this.fileManager.CreateEntityFile(collection.Id, collectionCrud.Image, collectionCrud.ImageExtension, MarbomilFolders.Collection)
                    :
                    this.fileManager.UpdateEntityFile(collection.ImageUrl, collectionCrud.Image, collectionCrud.ImageExtension);
            }

            if (collectionCrud.ImageCrop != null)
            {
                collection.ImageCropUrl = !this.fileManager.ExistsEntityFile(collection.ImageCropUrl) ?
                    this.fileManager.CreateEntityFile(collection.Id, collectionCrud.ImageCrop, collectionCrud.ImageExtension, MarbomilFolders.Collection)
                    :
                    this.fileManager.UpdateEntityFile(collection.ImageCropUrl, collectionCrud.ImageCrop, collectionCrud.ImageExtension);
            }

            this.repository.Save<Collection>(collection);
            this.repository.SaveChanges();
        }

        #endregion
    }
}
