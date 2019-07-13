using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.User.Buyer;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Enums;
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
    public class BuyersController : AdminController
    {
        private readonly IUserService userService;

        public BuyersController(IUserService userService)
        {
            this.userService = userService;
        }


        [HttpGet]
        [Route("buyers")]
        public IEnumerable<BuyerViewModel> GetBuyers()
        {
            return this.userService.Select()
                                   .Where(u => u.Role == UserRoles.Buyer)
                                   .AsQueryable()
                                   .ProjectTo<BuyerViewModel>(this.mapper.ConfigurationProvider)
                                   .ToList();
        }

        [HttpGet]
        [Route("buyers/{id}")]
        public BuyerViewModel GetBuyer(int id)
        {
            UserView buyer = this.userService.Select(id);

            return this.mapper.Map<BuyerViewModel>(buyer);
        }

        [HttpPost]
        [Route("buyers")]
        [ModelValidation]
        public HttpResponseMessage CreateBuyer(BuyerCreateModel buyerCreate)
        {
            this.logger.Debug("Create Buyer - start");

            UserCrud buyer = this.mapper.Map<UserCrud>(buyerCreate);

            this.userService.Create(buyer);

            this.logger.Debug("Create Buyer - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("buyers")]
        [ModelValidation]
        public HttpResponseMessage UpdateBuyer(BuyerUpdateModel buyerUpdate)
        {
            this.logger.Debug("Update Buyer - start");

            UserCrud buyer = this.mapper.Map<UserCrud>(buyerUpdate);

            this.userService.Update(buyer);

            this.logger.Debug("Update Buyer - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("buyers/{id}")]
        public HttpResponseMessage DeleteBuyer(int id)
        {
            HttpResponseMessage responseMessage;

            this.logger.Debug("Delete Buyer - start");

            if (this.userService.Exists(id))
            {
                this.userService.Delete(id);

                responseMessage = new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                responseMessage = this.Request.CreateResponse<string>(HttpStatusCode.BadRequest, "Buyer with passed id does not exists");
            }

            this.logger.Debug("Delete Buyer - end");

            return responseMessage;
        }
    }
}
