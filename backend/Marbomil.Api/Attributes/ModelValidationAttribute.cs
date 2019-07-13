using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Marbomil.Api.Attributes
{
    public class ModelValidationAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (!actionContext.ModelState.IsValid)
            {
                IEnumerable<string> validationMessages = actionContext.ModelState.Values.SelectMany(v => v.Errors)
                                                                                        .Where(err => !string.IsNullOrWhiteSpace(err.ErrorMessage))
                                                                                        .Select(e => e.ErrorMessage);
                IEnumerable<string> exceptionMessages = actionContext.ModelState.Values.SelectMany(v => v.Errors)
                                                                                       .Where(err => err.Exception != null
                                                                                                     &&
                                                                                                     !string.IsNullOrWhiteSpace(err.Exception.Message))
                                                                                       .Select(err => err.Exception.Message);
                IEnumerable<string> messages = validationMessages.Union(exceptionMessages);

                if (!messages.Any())
                {
                    messages = new List<string>() { "Bad request. Invalid data." };
                }

                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.BadRequest, messages);
            }
        }
    }
}
