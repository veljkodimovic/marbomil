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
    public class AttestService : ServiceBase, IAttestService
    {
        private readonly IRepository repository;
        private readonly IFileManager fileManager;

        public AttestService(IRepository repository, IFileManager fileManager)
        {
            this.repository = repository;
            this.fileManager = fileManager;
        }


        #region IAttestService implementations

        public void Create(AttestCrud attestCrud)
        {
            Attest attest = this.mapper.Map<Attest>(attestCrud);
            this.repository.Save<Attest>(attest);
            this.repository.SaveChanges();

            if (attestCrud.File != null
                &&
                attestCrud.File.Length > 0)
            {
                string fileRelativePath = this.fileManager.CreateEntityFile(attest.Id, attestCrud.File, attestCrud.FileExtension, MarbomilFolders.Attest);

                attest.FileUrl = fileRelativePath;
                this.repository.Save<Attest>(attest);
            }

            this.repository.SaveChanges();
        }

        public void Delete(int id)
        {
            this.repository.Delete<Attest>(id);
            this.fileManager.DeleteEntityFilesFolder(id, MarbomilFolders.Attest);
            this.repository.SaveChanges();
        }

        public AttestCrud Edit(int id)
        {
            Attest attest = this.repository.Select<Attest>(id);

            return this.mapper.Map<AttestCrud>(attest);
        }

        public AttestView Select(int id)
        {
            Attest attest = this.repository.Select<Attest>(id);

            return this.mapper.Map<AttestView>(attest);
        }

        public IEnumerable<AttestView> Select()
        {
            return this.repository.Select<Attest>()
                                  .ProjectTo<AttestView>(this.mapper.ConfigurationProvider);
        }

        public void Update(AttestCrud attestCrud)
        {
            Attest attest = this.repository.Select<Attest>(attestCrud.Id);
            attest = this.mapper.Map<AttestCrud, Attest>(attestCrud, attest);

            if (attestCrud.File != null
                &&
                attestCrud.File.Length > 0)
            {
                attest.FileUrl = !this.fileManager.ExistsEntityFile(attest.FileUrl) ?
                    this.fileManager.CreateEntityFile(attest.Id, attestCrud.File, attestCrud.FileExtension, MarbomilFolders.Attest)
                    :
                    this.fileManager.UpdateEntityFile(attest.FileUrl, attestCrud.File, attestCrud.FileExtension);
            }

            this.repository.Save<Attest>(attest);
            this.repository.SaveChanges();
        }

        #endregion
    }
}
