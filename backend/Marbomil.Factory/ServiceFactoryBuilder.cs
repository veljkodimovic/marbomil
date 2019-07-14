using Autofac;
using Autofac.Integration.WebApi;
using Marbomil.Domain.Security;
using Marbomil.Infrastructure;
using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Files;
using Marbomil.Infrastructure.Logging;
using Marbomil.Infrastructure.Managers;
using Marbomil.Infrastructure.Services;
using Marbomil.Repository;
using Marbomil.Repository.Stores;
using Marbomil.Services;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Marbomil.Factory
{
    public static class ServiceFactoryBuilder
    {

        public static void SetWebApiDependencies(System.Reflection.Assembly webApiAssembly, HttpConfiguration httpConfiguration, IAppBuilder appBuilder, Module webApiModule)
        {
            // Register components
            ContainerBuilder containerBuilder = new ContainerBuilder();

            // Register dependencies in controllers
            containerBuilder.RegisterApiControllers(webApiAssembly);

            #region Register core functionalities

            // Database entities context
            containerBuilder.Register(dbContext => new MarbomilDbContext())
                            .InstancePerLifetimeScope();

            // Repository
            containerBuilder.RegisterType<Marbomil.Repository.Repository>()
                            .As<IRepository>()
                            .InstancePerLifetimeScope();

            // FileManager
            containerBuilder.RegisterType<FileManager>()
                            .As<IFileManager>()
                            .InstancePerLifetimeScope();

            // Logger
            containerBuilder.Register(c => LoggerFactory.GetLogger())
                            .As<ILogger>()
                            .InstancePerLifetimeScope();

            // Stores
            containerBuilder.Register(c => new ApplicationUserStore(c.Resolve<MarbomilDbContext>()))
                            .As<IUserStore<User, int>>()
                            .InstancePerLifetimeScope();
            containerBuilder.Register(c => new ApplicationRoleStore(c.Resolve<MarbomilDbContext>()))
                            .As<IRoleStore<Role, int>>()
                            .InstancePerLifetimeScope();

            // Managers
            containerBuilder.Register(c => new ApplicationUserManager(c.Resolve<IUserStore<User, int>>()))
                            .As<ApplicationUserManager>()
                            .InstancePerLifetimeScope();
            containerBuilder.Register(c => new ApplicationRoleManager(c.Resolve<IRoleStore<Role, int>>()))
                            .As<ApplicationRoleManager>()
                            .InstancePerLifetimeScope();

            // Services
            containerBuilder.RegisterType<AttestService>()
                            .As<IAttestService>()
                            .InstancePerLifetimeScope();
            containerBuilder.RegisterType<BannerService>()
                            .As<IBannerService>()
                            .InstancePerLifetimeScope();
            containerBuilder.RegisterType<CatalogueService>()
                            .As<ICatalogueService>()
                            .InstancePerLifetimeScope();
            containerBuilder.RegisterType<CategoryService>()
                            .As<ICategoryService>()
                            .InstancePerLifetimeScope();
            containerBuilder.RegisterType<CollectionService>()
                            .As<ICollectionService>()
                            .InstancePerLifetimeScope();
            containerBuilder.RegisterType<SalesService>()
                            .As<ISalesService>()
                            .InstancePerLifetimeScope();
            containerBuilder.RegisterType<ServiceSupportService>()
                            .As<IServiceSupportService>()
                            .InstancePerLifetimeScope();
            containerBuilder.RegisterType<VideoService>()
                            .As<IVideoService>()
                            .InstancePerLifetimeScope();
            containerBuilder.RegisterType<ProductService>()
                            .As<IProductService>()
                            .InstancePerLifetimeScope();
            containerBuilder.RegisterType<LoginService>()
                            .As<ILoginService>()
                            .InstancePerLifetimeScope();
            containerBuilder.RegisterType<UserService>()
                            .As<IUserService>()
                            .InstancePerLifetimeScope();
            containerBuilder.RegisterType<OrderService>()
                            .As<IOrderService>()
                            .InstancePerLifetimeScope();

            #endregion

            // Register Web API Module
            containerBuilder.RegisterModule(webApiModule);

            // Setting DependencyResolver
            IContainer container = containerBuilder.Build();
            AutofacWebApiDependencyResolver dependencyResolver = new AutofacWebApiDependencyResolver(container);
            httpConfiguration.DependencyResolver = dependencyResolver;

            // Create Per OWIN Context
            appBuilder.CreatePerOwinContext<ApplicationSignInManager>((a, p) => new ApplicationSignInManager(container.Resolve<ApplicationUserManager>(), p.Authentication));
            appBuilder.CreatePerOwinContext<IRepository>(() => container.Resolve<IRepository>());

            // Setting Bearer token generation
            appBuilder.UseOAuthAuthorizationServer(AuthenticationConfig.GetOAuthAuthorizationServerOptions());
            appBuilder.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            // Enabling OWIN CORS
            appBuilder.UseCors(CorsOptions.AllowAll);

            // Registering Owin with Dependecy Injection framework
            appBuilder.UseAutofacMiddleware(container);
            appBuilder.UseAutofacWebApi(httpConfiguration);

            // Configures Web API to run on top of OWIN
            appBuilder.UseWebApi(httpConfiguration);
        }

    }
}
