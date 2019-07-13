using Marbomil.Api.Models;
using Marbomil.Api.Models.Login;
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
    public class LoginController : BaseController
    {
        private readonly ILoginService loginService;

        public LoginController(ILoginService loginService)
        {
            this.loginService = loginService;
        }


        #region Private 

        private HttpResponseMessage GenerateResponseMessage(TokenData tokenData, string errorTitle)
        {
            HttpResponseMessage responseMessage;

            if (tokenData.IsValid)
            {
                responseMessage = this.Request.CreateResponse(HttpStatusCode.OK, tokenData);
            }
            else
            {
                ErrorModel errorModel = new ErrorModel
                {
                    Title = errorTitle,
                    Description = tokenData.ErrorMessage
                };

                responseMessage = this.Request.CreateResponse(HttpStatusCode.Unauthorized, errorModel);
            }

            return responseMessage;
        }

        #endregion

        #region Action methods

        [HttpPost]
        [Route("login")]
        public HttpResponseMessage Login(LoginModel loginModel)
        {
            TokenData tokenData = this.loginService.Validate(loginModel.Username, loginModel.Password);

            return this.GenerateResponseMessage(tokenData, "Login failed");
        }

        [HttpPost]
        [Route("login/refresh")]
        public HttpResponseMessage LoginRefresh(LoginRefreshModel loginRefreshModel)
        {
            TokenData tokenData = this.loginService.Validate(loginRefreshModel.RefreshToken);

            return this.GenerateResponseMessage(tokenData, "Login refresh failed.");
        }

        #endregion
    }
}
