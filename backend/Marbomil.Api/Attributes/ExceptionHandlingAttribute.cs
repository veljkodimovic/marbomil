using Marbomil.Api.Models;
using Marbomil.Infrastructure.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Filters;

namespace Marbomil.Api.Attributes
{
    public class ExceptionHandlingAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            if (actionExecutedContext.Exception != null)
            {
                ILogger logger = LoggerFactory.GetLogger();
                Exception exception = actionExecutedContext.Exception;

                logger.Error(exception.Message, exception);

                ErrorModel errorModel = new ErrorModel
                {
                    Title = "Request execution error",
                    Description = "Error occurred during request execution. Please try again or contact the administrator."
                };

                actionExecutedContext.Response = actionExecutedContext.Request.CreateResponse<ErrorModel>(HttpStatusCode.InternalServerError, errorModel);
            }
        }
    }
}
