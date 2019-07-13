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
    public class BannerService : ServiceBase, IBannerService
    {
        private readonly IRepository repository;
        private readonly IFileManager fileManager;

        public BannerService(IRepository repository, IFileManager fileManager)
        {
            this.repository = repository;
            this.fileManager = fileManager;
        }


        #region IBannerService implementations

        public void Create(BannerCrud bannerCrud)
        {
            Banner banner = this.mapper.Map<Banner>(bannerCrud);
            this.repository.Save<Banner>(banner);
            this.repository.SaveChanges();

            if (bannerCrud.Image != null
                &&
                bannerCrud.Image.Length > 0)
            {
                string imageRelativePath = this.fileManager.CreateEntityFile(banner.Id, bannerCrud.Image, bannerCrud.ImageExtension, MarbomilFolders.Banner);
                banner.ImageUrl = imageRelativePath;

                this.repository.Save<Banner>(banner);
            }

            if (bannerCrud.ImageCrop != null
                &&
                bannerCrud.ImageCrop.Length > 0)
            {
                string imageCropRelativePath = this.fileManager.CreateEntityFile(banner.Id, bannerCrud.ImageCrop, bannerCrud.ImageExtension, MarbomilFolders.Banner);

                banner.ImageCropUrl = imageCropRelativePath;
                this.repository.Save<Banner>(banner);
            }
            
            this.repository.SaveChanges();
        }

        public void Delete(int id)
        {
            this.repository.Delete<Banner>(id);
            this.fileManager.DeleteEntityFilesFolder(id, MarbomilFolders.Banner);
            this.repository.SaveChanges();
        }

        public BannerCrud Edit(int id)
        {
            Banner banner = this.repository.Select<Banner>(id);

            return this.mapper.Map<BannerCrud>(banner);
        }

        public BannerView Select(int id)
        {
            Banner banner = this.repository.Select<Banner>(id);

            return this.mapper.Map<BannerView>(banner);
        }

        public IEnumerable<BannerView> Select()
        {
            return this.repository.Select<Banner>()
                                  .ProjectTo<BannerView>(this.mapper.ConfigurationProvider);
        }

        public void Update(BannerCrud bannerCrud)
        {
            Banner banner = this.repository.Select<Banner>(bannerCrud.Id);
            banner = this.mapper.Map<BannerCrud, Banner>(bannerCrud, banner);

            if (bannerCrud.Image != null
                &&
                bannerCrud.Image.Length > 0)
            {
                banner.ImageUrl = !this.fileManager.ExistsEntityFile(banner.ImageUrl) ?
                    this.fileManager.CreateEntityFile(banner.Id, bannerCrud.Image, bannerCrud.ImageExtension, MarbomilFolders.Banner)
                    :
                    this.fileManager.UpdateEntityFile(banner.ImageUrl, bannerCrud.Image, bannerCrud.ImageExtension);
            }

            if (bannerCrud.ImageCrop != null
                &&
                bannerCrud.ImageCrop.Length > 0)
            {
                banner.ImageCropUrl = !this.fileManager.ExistsEntityFile(banner.ImageCropUrl) ?
                    this.fileManager.CreateEntityFile(banner.Id, bannerCrud.ImageCrop, bannerCrud.ImageExtension, MarbomilFolders.Banner)
                    :
                    this.fileManager.UpdateEntityFile(banner.ImageCropUrl, bannerCrud.ImageCrop, bannerCrud.ImageExtension);
            }

            this.repository.Save<Banner>(banner);
            this.repository.SaveChanges();
        }

        #endregion
    }
}
