using Marbomil.Factory;
using Newtonsoft.Json.Serialization;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Marbomil.Api
{
    
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            HttpConfiguration config = new HttpConfiguration();

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Setting Web API configuration and services
            Assembly webApiAssembly = typeof(Program).Assembly;
            Autofac.Module webApiModule = new RegistrationModule();
            ServiceFactoryBuilder.SetWebApiDependencies(webApiAssembly, config, appBuilder, webApiModule);

            config.MapHttpAttributeRoutes();

            appBuilder.UseStaticFiles();
            appBuilder.UseWebApi(config);
        }
    }
}
