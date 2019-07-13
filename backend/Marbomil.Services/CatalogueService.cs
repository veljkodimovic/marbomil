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
    public class CatalogueService : ServiceBase, ICatalogueService
    {
        private readonly IRepository repository;
        private readonly IFileManager fileManager;

        public CatalogueService(IRepository repository, IFileManager fileManager)
        {
            this.repository = repository;
            this.fileManager = fileManager;
        }


        #region ICatalogueService implementations

        public void Create(CatalogueCrud catalogueCrud)
        {
            Catalogue catalogue = this.mapper.Map<Catalogue>(catalogueCrud);
            this.repository.Save<Catalogue>(catalogue);
            this.repository.SaveChanges();

            if (catalogueCrud.File != null
                &&
                catalogueCrud.File.Length > 0)
            {
                string fileRelativePath = this.fileManager.CreateEntityFile(catalogue.Id, catalogueCrud.File, catalogueCrud.FileExtension, MarbomilFolders.Catalogue);

                catalogue.FileUrl = fileRelativePath;
                this.repository.Save<Catalogue>(catalogue);
            }
            
            this.repository.SaveChanges();
        }

        public void Delete(int id)
        {
            this.repository.Delete<Catalogue>(id);
            this.fileManager.DeleteEntityFilesFolder(id, MarbomilFolders.Catalogue);
            this.repository.SaveChanges();
        }

        public CatalogueCrud Edit(int id)
        {
            Catalogue catalogue = this.repository.Select<Catalogue>(id);

            return this.mapper.Map<CatalogueCrud>(catalogue);
        }

        public CatalogueView Select(int id)
        {
            Catalogue catalogue = this.repository.Select<Catalogue>(id);

            return this.mapper.Map<CatalogueView>(catalogue);
        }

        public IEnumerable<CatalogueView> Select()
        {
            return this.repository.Select<Catalogue>()
                                  .ProjectTo<CatalogueView>(this.mapper.ConfigurationProvider);
        }

        public void Update(CatalogueCrud catalogueCrud)
        {
            Catalogue catalogue = this.repository.Select<Catalogue>(catalogueCrud.Id);
            catalogue = this.mapper.Map<CatalogueCrud, Catalogue>(catalogueCrud, catalogue);

            if (catalogueCrud.File != null
                &&
                catalogueCrud.File.Length > 0)
            {
                catalogue.FileUrl = !this.fileManager.ExistsEntityFile(catalogue.FileUrl) ?
                    this.fileManager.CreateEntityFile(catalogue.Id, catalogueCrud.File, catalogueCrud.FileExtension, MarbomilFolders.Catalogue)
                    :
                    this.fileManager.UpdateEntityFile(catalogue.FileUrl, catalogueCrud.File, catalogueCrud.FileExtension);
            }

            this.repository.Save<Catalogue>(catalogue);
            this.repository.SaveChanges();
        }

        #endregion
    }
}
