using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.Catalogue;
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
    public class CatalogueController : AdminController
    {
        private readonly ICatalogueService catalogueService;

        public CatalogueController(ICatalogueService catalogueService)
        {
            this.catalogueService = catalogueService;
        }


        [HttpGet]
        [Route("catalogue")]
        [AllowAnonymous]
        public IEnumerable<CatalogueViewModel> GetCatalogues()
        {
            return this.catalogueService.Select()
                                        .AsQueryable()
                                        .ProjectTo<CatalogueViewModel>(this.mapper.ConfigurationProvider)
                                        .ToList();
        }

        [HttpGet]
        [Route("catalogue/{id}")]
        [AllowAnonymous]
        public CatalogueViewModel GetCatalogue(int id)
        {
            CatalogueView catalogue = this.catalogueService.Select(id);

            return this.mapper.Map<CatalogueViewModel>(catalogue);
        }

        [HttpPost]
        [Route("catalogue")]
        [ModelValidation]
        public HttpResponseMessage CreateCatalogue(CatalogueCreateModel catalogueCreate)
        {
            this.logger.Debug("Create Catalogue - start");

            CatalogueCrud catalogue = this.mapper.Map<CatalogueCrud>(catalogueCreate);

            this.catalogueService.Create(catalogue);

            this.logger.Debug("Create Catalogue - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("catalogue")]
        [ModelValidation]
        public HttpResponseMessage UpdateCatalogue(CatalogueUpdateModel catalogueUpdate)
        {
            this.logger.Debug("Update Catalogue - start");

            CatalogueCrud catalogue = this.mapper.Map<CatalogueCrud>(catalogueUpdate);

            this.catalogueService.Update(catalogue);

            this.logger.Debug("Update Catalogue - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("catalogue/{id}")]
        public HttpResponseMessage DeleteCatalogue(int id)
        {
            this.logger.Debug("Delete Catalogue - start");

            this.catalogueService.Delete(id);

            this.logger.Debug("Delete Catalogue - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
