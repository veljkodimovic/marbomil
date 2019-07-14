using AutoMapper;
using Marbomil.Services.MappingProfiles;

namespace Marbomil.Services
{
    public abstract class ServiceBase
    {
        protected readonly IMapper mapper;

        public ServiceBase()
        {
            this.mapper = this.GenerateMapper();
        }


        #region Private, protected methods

        private IMapper GenerateMapper()
        {
            var config = new MapperConfiguration(cfg => {

                cfg.AddProfile<AttestProfile>();
                cfg.AddProfile<BannerProfile>();
                cfg.AddProfile<CatalogueProfile>();
                cfg.AddProfile<CategoryProfile>();
                cfg.AddProfile<CollectionProfile>();
                cfg.AddProfile<SalesProfile>();
                cfg.AddProfile<ServiceProfile>();
                cfg.AddProfile<VideoProfile>();
                cfg.AddProfile<ProductProfile>();
                cfg.AddProfile<UserProfile>();
                cfg.AddProfile<OrderProfile>();
            });

            return config.CreateMapper();
        }        

        #endregion
    }
}
