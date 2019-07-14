using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.User;
using Marbomil.Api.Models.User.Marbomil;
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
using System.Web;
using System.Web.Http;

namespace Marbomil.Api.Controllers
{
    public class UsersController : AdminController
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }


        [HttpGet]
        [Route("users")]
        public IEnumerable<UserViewModel> GetUsers()
        {
            return this.userService.Select()
                                   .AsQueryable()
                                   .ProjectTo<UserViewModel>(this.mapper.ConfigurationProvider)
                                   .ToList();
        }

        [HttpGet]
        [Route("users/{id}")]
        public UserViewModel GetUser(int id)
        {
            UserView user = this.userService.Select(id);

            return this.mapper.Map<UserViewModel>(user);
        }

        [HttpPost]
        [Route("users")]
        [ModelValidation]
        public HttpResponseMessage CreateUser(UserCreateModel userCreate)
        {
            this.logger.Debug("Create User - start");

            UserCrud user = this.mapper.Map<UserCrud>(userCreate);

            this.userService.Create(user);

            this.logger.Debug("Create User - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("users")]
        [ModelValidation]
        public HttpResponseMessage UpdateUser(UserUpdateModel userUpdate)
        {
            this.logger.Debug("Update User - start");

            UserCrud user = this.mapper.Map<UserCrud>(userUpdate);

            this.userService.Update(user);

            this.logger.Debug("Update User - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("users/{id}")]
        public HttpResponseMessage DeleteUser(int id)
        {
            HttpResponseMessage responseMessage;

            this.logger.Debug("Delete User - start");

            if (this.userService.Exists(id))
            {
                this.userService.Delete(id);

                responseMessage = new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                responseMessage = this.Request.CreateResponse<string>(HttpStatusCode.BadRequest, "User with passed id does not exists");
            }

            this.logger.Debug("Delete User - end");

            return responseMessage;
        }
    }
}
