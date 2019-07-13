using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.Sales;
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
    public class SalesController : AdminController
    {
        private readonly ISalesService salesService;

        public SalesController(ISalesService salesService)
        {
            this.salesService = salesService;
        }


        [HttpGet]
        [Route("sales")]
        [AllowAnonymous]
        public IEnumerable<SalesViewModel> GetSaless()
        {
            return this.salesService.Select()
                                     .AsQueryable()
                                     .ProjectTo<SalesViewModel>(this.mapper.ConfigurationProvider)
                                     .ToList();
        }

        [HttpGet]
        [Route("sales/{id}")]
        [AllowAnonymous]
        public SalesViewModel GetSales(int id)
        {
            SalesView sales = this.salesService.Select(id);

            return this.mapper.Map<SalesViewModel>(sales);
        }

        [HttpPost]
        [Route("sales")]
        [ModelValidation]
        public HttpResponseMessage CreateSales(SalesCreateModel salesCreate)
        {
            this.logger.Debug("Create Sales - start");

            SalesCrud sales = this.mapper.Map<SalesCrud>(salesCreate);

            this.salesService.Create(sales);

            this.logger.Debug("Create Sales - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("sales")]
        [ModelValidation]
        public HttpResponseMessage UpdateSales(SalesUpdateModel salesUpdate)
        {
            this.logger.Debug("Update Sales - start");

            SalesCrud sales = this.mapper.Map<SalesCrud>(salesUpdate);

            this.salesService.Update(sales);

            this.logger.Debug("Update Sales - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("sales/{id}")]
        public HttpResponseMessage DeleteSales(int id)
        {
            this.logger.Debug("Delete Sales - start");

            this.salesService.Delete(id);

            this.logger.Debug("Delete Sales - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
