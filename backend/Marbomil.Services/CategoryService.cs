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
    public class CategoryService : ServiceBase, ICategoryService
    {
        private readonly IRepository repository;
        private readonly IFileManager fileManager;

        public CategoryService(IRepository repository, IFileManager fileManager)
        {
            this.repository = repository;
            this.fileManager = fileManager;
        }


        #region ICategoryService implementations

        public void Create(CategoryCrud categoryCrud)
        {
            Category category = this.mapper.Map<Category>(categoryCrud);
            this.repository.Save<Category>(category);
            this.repository.SaveChanges();

            if (categoryCrud.Image != null
                &&
                categoryCrud.Image.Length > 0)
            {
                string imageRelativePath = this.fileManager.CreateEntityFile(category.Id, categoryCrud.Image, categoryCrud.ImageExtension, MarbomilFolders.Category);
                category.ImageUrl = imageRelativePath;

                this.repository.Save<Category>(category);
            }

            if (categoryCrud.ImageCrop != null
                &&
                categoryCrud.ImageCrop.Length > 0)
            {
                string imageCropRelativePath = this.fileManager.CreateEntityFile(category.Id, categoryCrud.ImageCrop, categoryCrud.ImageExtension, MarbomilFolders.Category);

                category.ImageCropUrl = imageCropRelativePath;
                this.repository.Save<Category>(category);
            }
            
            this.repository.SaveChanges();
        }

        public void Delete(int id)
        {
            this.repository.Delete<Category>(id);
            this.fileManager.DeleteEntityFilesFolder(id, MarbomilFolders.Category);
            this.repository.SaveChanges();
        }

        public CategoryCrud Edit(int id)
        {
            Category category = this.repository.Select<Category>(id);

            return this.mapper.Map<CategoryCrud>(category);
        }

        public CategoryView Select(int id)
        {
            Category category = this.repository.Select<Category>(id);

            return this.mapper.Map<CategoryView>(category);
        }

        public IEnumerable<CategoryView> Select()
        {
            return this.repository.Select<Category>()
                                  .ProjectTo<CategoryView>(this.mapper.ConfigurationProvider);
        }

        public void Update(CategoryCrud categoryCrud)
        {
            Category category = this.repository.Select<Category>(categoryCrud.Id);
            category = this.mapper.Map<CategoryCrud, Category>(categoryCrud, category);

            if (categoryCrud.Image != null
                &&
                categoryCrud.Image.Length > 0)
            {
                category.ImageUrl = !this.fileManager.ExistsEntityFile(category.ImageUrl) ?
                    this.fileManager.CreateEntityFile(category.Id, categoryCrud.Image, categoryCrud.ImageExtension, MarbomilFolders.Category)
                    :
                    this.fileManager.UpdateEntityFile(category.ImageUrl, categoryCrud.Image, categoryCrud.ImageExtension);
            }

            if (categoryCrud.ImageCrop != null
                &&
                categoryCrud.ImageCrop.Length > 0)
            {
                category.ImageCropUrl = !this.fileManager.ExistsEntityFile(category.ImageCropUrl) ?
                    this.fileManager.CreateEntityFile(category.Id, categoryCrud.ImageCrop, categoryCrud.ImageExtension, MarbomilFolders.Category)
                    :
                    this.fileManager.UpdateEntityFile(category.ImageCropUrl, categoryCrud.ImageCrop, categoryCrud.ImageExtension);
            }

            this.repository.Save<Category>(category);
            this.repository.SaveChanges();
        }

        #endregion
    }
}
