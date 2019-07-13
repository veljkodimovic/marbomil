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
    public class SalesService : ServiceBase, ISalesService
    {
        private readonly IRepository repository;

        public SalesService(IRepository repository)
        {
            this.repository = repository;
        }


        #region ISalesService implementation

        public void Create(SalesCrud salesCrud)
        {
            Sales sales = this.mapper.Map<Sales>(salesCrud);
            this.repository.Save<Sales>(sales);
            this.repository.SaveChanges();
        }

        public void Delete(int id)
        {
            this.repository.Delete<Sales>(id);
            this.repository.SaveChanges();
        }

        public SalesCrud Edit(int id)
        {
            Sales sales = this.repository.Select<Sales>(id);

            return this.mapper.Map<SalesCrud>(sales);
        }

        public SalesView Select(int id)
        {
            Sales sales = this.repository.Select<Sales>(id);

            return this.mapper.Map<SalesView>(sales);
        }

        public IEnumerable<SalesView> Select()
        {
            return this.repository.Select<Sales>()
                                  .ProjectTo<SalesView>(this.mapper.ConfigurationProvider);
        }

        public void Update(SalesCrud salesCrud)
        {
            Sales sales = this.repository.Select<Sales>(salesCrud.Id);
            sales = this.mapper.Map<SalesCrud, Sales>(salesCrud, sales);

            this.repository.Save<Sales>(sales);
            this.repository.SaveChanges();
        }

        #endregion
    }
}
