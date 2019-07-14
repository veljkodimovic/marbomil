using AutoMapper;
using Marbomil.Api.Attributes;
using Marbomil.Api.Mappings;
using Marbomil.Api.Models.Attest;
using Marbomil.Api.Models.Banner;
using Marbomil.Api.Models.Catalogue;
using Marbomil.Api.Models.Category;
using Marbomil.Api.Models.Collection;
using Marbomil.Api.Models.Product;
using Marbomil.Api.Models.Sales;
using Marbomil.Api.Models.Service;
using Marbomil.Api.Models.User;
using Marbomil.Api.Models.User.Marbomil;
using Marbomil.Api.Models.Video;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Marbomil.Api.Controllers
{
    [ExceptionHandling]
    public abstract class BaseController : ApiController
    {
        protected readonly IMapper mapper;
        protected readonly ILogger logger;

        public BaseController()
        {
            this.mapper = this.GenerateMapper();
            this.logger = LoggerFactory.GetLogger();
        }


        private IMapper GenerateMapper()
        {
            MapperConfiguration mapperConfiguration = new MapperConfiguration(cfg => {

                cfg.AddProfile<AttestProfile>();
                cfg.AddProfile<BanerProfile>();
                cfg.AddProfile<CatalogueProfile>();
                cfg.AddProfile<CategoryProfile>();
                cfg.AddProfile<CollectionProfile>();
                cfg.AddProfile<ProductProfile>();
                cfg.AddProfile<SalesProfile>();
                cfg.AddProfile<ServiceProfile>();
                cfg.AddProfile<UserProfile>();
                cfg.AddProfile<VideoProfile>();
                cfg.AddProfile<OrderProfile>();
            });

            return mapperConfiguration.CreateMapper();
        }

        
    }
}
