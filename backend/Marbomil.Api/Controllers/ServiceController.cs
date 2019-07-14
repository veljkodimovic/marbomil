using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.Service;
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
    public class ServiceController : AdminController
    {
        private readonly IServiceSupportService serviceSupportService;

        public ServiceController(IServiceSupportService serviceSupportService)
        {
            this.serviceSupportService = serviceSupportService;
        }


        [HttpGet]
        [Route("service")]
        [AllowAnonymous]
        public IEnumerable<ServiceViewModel> GetServices()
        {
            return this.serviceSupportService.Select()
                                             .AsQueryable()
                                             .ProjectTo<ServiceViewModel>(this.mapper.ConfigurationProvider)
                                             .ToList();
        }

        [HttpGet]
        [Route("service/{id}")]
        [AllowAnonymous]
        public ServiceViewModel GetService(int id)
        {
            ServiceView service = this.serviceSupportService.Select(id);

            return this.mapper.Map<ServiceViewModel>(service);
        }

        [HttpPost]
        [Route("service")]
        [ModelValidation]
        public HttpResponseMessage CreateService(ServiceCreateModel serviceCreate)
        {
            this.logger.Debug("Create Service - start");

            ServiceCrud service = this.mapper.Map<ServiceCrud>(serviceCreate);

            this.serviceSupportService.Create(service);

            this.logger.Debug("Create Service - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("service")]
        [ModelValidation]
        public HttpResponseMessage UpdateService(ServiceUpdateModel serviceUpdate)
        {
            this.logger.Debug("Update Service - start");

            ServiceCrud service = this.mapper.Map<ServiceCrud>(serviceUpdate);

            this.serviceSupportService.Update(service);

            this.logger.Debug("Update Service - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("service/{id}")]
        public HttpResponseMessage DeleteService(int id)
        {
            this.logger.Debug("Delete Service - start");

            this.serviceSupportService.Delete(id);

            this.logger.Debug("Delete Service - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
