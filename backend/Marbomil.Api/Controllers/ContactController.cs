using Marbomil.Api.Attributes;
using Marbomil.Api.Models.General;
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
    public class ContactController : AdminController
    {

        [HttpPost]
        [Route("contact/message")]
        [AllowAnonymous]
        [ModelValidation]
        public HttpResponseMessage SendContactMessage(ContactMessageModel contactMessageModel)
        {
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("contact/newsletter/registration")]
        [AllowAnonymous]
        [ModelValidation]
        public HttpResponseMessage RegisterForNewsletter(NewsletterRegistrationModel newsletterRegistrationModel)
        {
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

    }
}
