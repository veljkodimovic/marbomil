using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.Order;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Services;
using Microsoft.AspNet.Identity;
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
    public class OrderController : AdminController
    {
        private readonly IOrderService orderService;

        public OrderController(IOrderService orderService)
        {
            this.orderService = orderService;
        }


        [HttpGet]
        [Route("orders")]
        public IEnumerable<OrderViewModel> GetOrders()
        {
            return this.orderService.Select()
                                    .AsQueryable()
                                    .ProjectTo<OrderViewModel>(this.mapper.ConfigurationProvider)
                                    .ToList();
        }

        [HttpGet]
        [Route("orders/{id}")]
        public OrderViewModel GetOrder(int id)
        {
            OrderView order = this.orderService.Select(id);

            return this.mapper.Map<OrderViewModel>(order);
        }

        [HttpPost]
        [Route("orders")]
        [ModelValidation]
        public HttpResponseMessage CreateOrder(OrderCreateModel orderCreateData)
        {
            this.logger.Debug("Create Order - start");

            OrderCrud orderCrud = this.mapper.Map<OrderCrud>(orderCreateData);

            orderCrud.BuyerId = this.User
                                    .Identity
                                    .GetUserId<int>();
            this.orderService.Create(orderCrud);

            this.logger.Debug("Create Order - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("orders")]
        [ModelValidation]
        public HttpResponseMessage UpdateOrder(OrderUpdateModel orderUpdateData)
        {
            this.logger.Debug("Update Order - start");

            OrderCrud orderCrud = this.mapper.Map<OrderCrud>(orderUpdateData);

            this.orderService.Update(orderCrud);

            this.logger.Debug("Update Order - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("orders/{id}")]
        public HttpResponseMessage DeleteOrder(int id)
        {
            this.logger.Debug("Delete Attest - start");

            this.orderService.Delete(id);

            this.logger.Debug("Delete Attest - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
