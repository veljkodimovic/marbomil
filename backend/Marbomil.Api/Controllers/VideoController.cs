using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.Video;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Marbomil.Api.Controllers
{
    public class VideoController : AdminController
    {
        private readonly IVideoService videoService;

        public VideoController(IVideoService videoService)
        {
            this.videoService = videoService;
        }


        [HttpGet]
        [Route("video")]
        [AllowAnonymous]
        public IEnumerable<VideoViewModel> GetVideos()
        {
            return this.videoService.Select()
                                     .AsQueryable()
                                     .ProjectTo<VideoViewModel>(this.mapper.ConfigurationProvider)
                                     .ToList();
        }

        [HttpGet]
        [Route("video/{id}")]
        [AllowAnonymous]
        public VideoViewModel GetVideo(int id)
        {
            VideoView video = this.videoService.Select(id);

            return this.mapper.Map<VideoViewModel>(video);
        }

        [HttpGet]
        [Route("video/edit/{id}")]
        public VideoUpdateModel GetVideoEdit(int id)
        {
            VideoCrud videoCrud = this.videoService.Edit(id);

            return this.mapper.Map<VideoUpdateModel>(videoCrud);
        }

        [HttpPost]
        [Route("video")]
        [ModelValidation]
        public HttpResponseMessage CreateVideo(VideoCreateModel videoCreate)
        {
            this.logger.Debug("Create Video - start");

            VideoCrud video = this.mapper.Map<VideoCrud>(videoCreate);

            this.videoService.Create(video);

            this.logger.Debug("Create Video - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("video")]
        [ModelValidation]
        public HttpResponseMessage UpdateVideo(VideoUpdateModel videoUpdate)
        {
            this.logger.Debug("Update Video - start");

            VideoCrud video = this.mapper.Map<VideoCrud>(videoUpdate);

            this.videoService.Update(video);

            this.logger.Debug("Update Video - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("video/{id}")]
        public HttpResponseMessage DeleteVideo(int id)
        {
            this.logger.Debug("Delete Video - start");

            this.videoService.Delete(id);

            this.logger.Debug("Delete Video - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
