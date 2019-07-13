using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.Banner;
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
    public class BannerController : AdminController
    {
        private readonly IBannerService bannerService;

        public BannerController(IBannerService bannerService)
        {
            this.bannerService = bannerService;
        }


        [HttpGet]
        [Route("banner")]
        [AllowAnonymous]
        public IEnumerable<BannerViewModel> GetBanners()
        {
            return this.bannerService.Select()
                                     .AsQueryable()
                                     .ProjectTo<BannerViewModel>(this.mapper.ConfigurationProvider)
                                     .ToList();
        }

        [HttpGet]
        [Route("banner/{id}")]
        [AllowAnonymous]
        public BannerViewModel GetBanner(int id)
        {
            BannerView banner = this.bannerService.Select(id);

            return this.mapper.Map<BannerViewModel>(banner);
        }

        [HttpGet]
        [Route("banner/edit/{id}")]
        public BannerUpdateModel GetBannerEdit(int id)
        {
            BannerCrud banner = this.bannerService.Edit(id);

            return this.mapper.Map<BannerUpdateModel>(banner);
        }

        [HttpPost]
        [Route("banner")]
        [ModelValidation]
        public HttpResponseMessage CreateBanner(BannerCreateModel bannerCreate)
        {
            this.logger.Debug("Create Banner - start");

            BannerCrud banner = this.mapper.Map<BannerCrud>(bannerCreate);

            this.bannerService.Create(banner);

            this.logger.Debug("Create Banner - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("banner")]
        [ModelValidation]
        public HttpResponseMessage UpdateBanner(BannerUpdateModel bannerUpdate)
        {
            this.logger.Debug("Update Banner - start");

            BannerCrud banner = this.mapper.Map<BannerCrud>(bannerUpdate);

            this.bannerService.Update(banner);

            this.logger.Debug("Update Banner - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("banner/{id}")]
        public HttpResponseMessage DeleteBanner(int id)
        {
            this.logger.Debug("Delete Banner - start");

            this.bannerService.Delete(id);

            this.logger.Debug("Delete Banner - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
