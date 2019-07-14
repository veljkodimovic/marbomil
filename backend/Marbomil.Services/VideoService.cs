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
    public class VideoService : ServiceBase, IVideoService
    {
        private readonly IRepository repository;
        private readonly IFileManager fileManager;

        public VideoService(IRepository repository, IFileManager fileManager)
        {
            this.repository = repository;
            this.fileManager = fileManager;
        }


        #region IVideoService implementations

        public void Create(VideoCrud videoCrud)
        {
            Video video = this.mapper.Map<Video>(videoCrud);
            this.repository.Save<Video>(video);
            this.repository.SaveChanges();

            if (videoCrud.Image != null
                &&
                videoCrud.Image.Length > 0)
            {
                string imageRelativePath = this.fileManager.CreateEntityFile(video.Id, videoCrud.Image, videoCrud.ImageExtension, MarbomilFolders.Video);
                video.ImageUrl = imageRelativePath;

                this.repository.Save<Video>(video);
            }

            if (videoCrud.ImageCrop != null
                &&
                videoCrud.ImageCrop.Length > 0)
            {
                string imageCropRelativePath = this.fileManager.CreateEntityFile(video.Id, videoCrud.ImageCrop, videoCrud.ImageExtension, MarbomilFolders.Video);

                video.ImageCropUrl = imageCropRelativePath;
                this.repository.Save<Video>(video);
            }
            
            this.repository.SaveChanges();
        }

        public void Delete(int id)
        {
            this.repository.Delete<Video>(id);
            this.fileManager.DeleteEntityFilesFolder(id, MarbomilFolders.Video);
            this.repository.SaveChanges();
        }

        public VideoCrud Edit(int id)
        {
            Video video = this.repository.Select<Video>(id);

            return this.mapper.Map<VideoCrud>(video);
        }

        public VideoView Select(int id)
        {
            Video video = this.repository.Select<Video>(id);

            return this.mapper.Map<VideoView>(video);
        }

        public IEnumerable<VideoView> Select()
        {
            return this.repository.Select<Video>()
                                  .ProjectTo<VideoView>(this.mapper.ConfigurationProvider);
        }

        public void Update(VideoCrud videoCrud)
        {
            Video video = this.repository.Select<Video>(videoCrud.Id);
            video = this.mapper.Map<VideoCrud, Video>(videoCrud, video);

            this.repository.Save<Video>(video);

            if (videoCrud.Image != null
                &&
                videoCrud.Image.Length > 0)
            {
                video.ImageUrl = !this.fileManager.ExistsEntityFile(video.ImageUrl) ?
                    this.fileManager.CreateEntityFile(video.Id, videoCrud.Image, videoCrud.ImageExtension, MarbomilFolders.Video)
                    :
                    this.fileManager.UpdateEntityFile(video.ImageUrl, videoCrud.Image, videoCrud.ImageExtension);
            }

            if (videoCrud.ImageCrop != null
                &&
                videoCrud.ImageCrop.Length > 0)
            {
                video.ImageCropUrl = !this.fileManager.ExistsEntityFile(video.ImageCropUrl) ?
                    this.fileManager.CreateEntityFile(video.Id, videoCrud.ImageCrop, videoCrud.ImageExtension, MarbomilFolders.Video)
                    :
                    this.fileManager.UpdateEntityFile(video.ImageCropUrl, videoCrud.ImageCrop, videoCrud.ImageExtension);
            }

            this.repository.SaveChanges();
        }

        #endregion

    }
}
