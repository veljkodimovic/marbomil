using Autofac;
using FluentValidation;
using FluentValidation.WebApi;
using Marbomil.Api.Models.Attest;
using Marbomil.Api.Models.Banner;
using Marbomil.Api.Models.Catalogue;
using Marbomil.Api.Models.Category;
using Marbomil.Api.Models.Collection;
using Marbomil.Api.Models.General;
using Marbomil.Api.Models.Order;
using Marbomil.Api.Models.Product;
using Marbomil.Api.Models.Sales;
using Marbomil.Api.Models.Service;
using Marbomil.Api.Models.User;
using Marbomil.Api.Models.User.Buyer;
using Marbomil.Api.Models.User.Marbomil;
using Marbomil.Api.Models.Video;
using Marbomil.Api.Validations;
using Marbomil.Api.Validations.Attest;
using Marbomil.Api.Validations.Banner;
using Marbomil.Api.Validations.Catalogue;
using Marbomil.Api.Validations.Category;
using Marbomil.Api.Validations.Collection;
using Marbomil.Api.Validations.General;
using Marbomil.Api.Validations.Order;
using Marbomil.Api.Validations.Product;
using Marbomil.Api.Validations.Sales;
using Marbomil.Api.Validations.Service;
using Marbomil.Api.Validations.User;
using Marbomil.Api.Validations.User.Buyer;
using Marbomil.Api.Validations.User.Marbomil;
using Marbomil.Api.Validations.Video;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Validation;

namespace Marbomil.Api
{
    public class RegistrationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<FluentValidationModelValidatorProvider>()
                   .As<ModelValidatorProvider>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<ValidatorFactory>()
                   .As<IValidatorFactory>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<AttestCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<AttestCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<AttestUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<AttestUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<BannerCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<BannerCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<BannerUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<BannerUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<CatalogueCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<CatalogueCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<CatalogueUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<CatalogueUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<CategoryCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<CategoryCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<CategoryUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<CategoryUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<CollectionCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<CollectionCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<CollectionUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<CollectionUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<ProductCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<ProductCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<ProductUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<ProductUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<SalesCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<SalesCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<SalesUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<SalesUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<ServiceCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<ServiceCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<ServiceUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<ServiceUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<VideoCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<VideoCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<VideoUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<VideoUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<ContactMessageValidator>()
                   .Keyed<IValidator>(typeof(IValidator<ContactMessageModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<NewsletterRegistrationValidator>()
                   .Keyed<IValidator>(typeof(IValidator<NewsletterRegistrationModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<UserCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<UserCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<UserUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<UserUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();

            builder.RegisterType<BuyerCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<BuyerCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<BuyerUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<BuyerUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            
            builder.RegisterType<OrderCreateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<OrderCreateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
            builder.RegisterType<OrderUpdateValidator>()
                   .Keyed<IValidator>(typeof(IValidator<OrderUpdateModel>))
                   .As<IValidator>()
                   .InstancePerLifetimeScope();
        }
    }
}
