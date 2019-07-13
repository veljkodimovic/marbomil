using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.Attest;
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
    public class AttestController : AdminController
    {
        private readonly IAttestService attestService;

        public AttestController(IAttestService attestService)
        {
            this.attestService = attestService;
        }


        [HttpGet]
        [Route("attest")]
        [AllowAnonymous]
        public IEnumerable<AttestViewModel> GetAttests()
        {
            return this.attestService.Select()
                                     .AsQueryable()
                                     .ProjectTo<AttestViewModel>(this.mapper.ConfigurationProvider)
                                     .ToList();
        }

        [HttpGet]
        [Route("attest/{id}")]
        [AllowAnonymous]
        public AttestViewModel GetAttest(int id)
        {
            AttestView attest = this.attestService.Select(id);

            return this.mapper.Map<AttestViewModel>(attest);
        }

        [HttpPost]
        [Route("attest")]
        [ModelValidation]
        public HttpResponseMessage CreateAttest(AttestCreateModel attestCreate)
        {
            this.logger.Debug("Create Attest - start");

            AttestCrud attest = this.mapper.Map<AttestCrud>(attestCreate);

            this.attestService.Create(attest);

            this.logger.Debug("Create Attest - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("attest")]
        [ModelValidation]
        public HttpResponseMessage UpdateAttest(AttestUpdateModel attestUpdate)
        {
            this.logger.Debug("Update Attest - start");

            AttestCrud attest = this.mapper.Map<AttestCrud>(attestUpdate);

            this.attestService.Update(attest);

            this.logger.Debug("Update Attest - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("attest/{id}")]
        public HttpResponseMessage DeleteAttest(int id)
        {
            this.logger.Debug("Delete Attest - start");

            this.attestService.Delete(id);

            this.logger.Debug("Delete Attest - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
