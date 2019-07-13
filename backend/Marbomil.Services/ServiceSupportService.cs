using AutoMapper.QueryableExtensions;
using Marbomil.Infrastructure;
using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Services
{
    public class ServiceSupportService : ServiceBase, IServiceSupportService
    {
        private IRepository repository;

        public ServiceSupportService(IRepository repository)
        {
            this.repository = repository;
        }


        #region IServiceService implementations

        public void Create(ServiceCrud serviceCrud)
        {
            Service service = this.mapper.Map<Service>(serviceCrud);
            this.repository.Save<Service>(service);
            this.repository.SaveChanges();
        }

        public void Delete(int id)
        {
            this.repository.Delete<Service>(id);
            this.repository.SaveChanges();
        }

        public ServiceCrud Edit(int id)
        {
            Service service = this.repository.Select<Service>(id);

            return this.mapper.Map<ServiceCrud>(service);
        }

        public ServiceView Select(int id)
        {
            Service service = this.repository.Select<Service>(id);

            return this.mapper.Map<ServiceView>(service);
        }

        public IEnumerable<ServiceView> Select()
        {
            return this.repository.Select<Service>()
                                  .ProjectTo<ServiceView>(this.mapper.ConfigurationProvider);
        }

        public void Update(ServiceCrud serviceCrud)
        {
            Service service = this.repository.Select<Service>(serviceCrud.Id);
            service = this.mapper.Map<ServiceCrud, Service>(serviceCrud, service);

            this.repository.Save<Service>(service);
            this.repository.SaveChanges();
        }

        #endregion
    }
}
