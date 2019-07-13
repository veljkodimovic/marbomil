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
    public class OrderService : ServiceBase, IOrderService
    {
        private readonly IRepository repository;

        public OrderService(IRepository repository)
        {
            this.repository = repository;
        }

        #region IOrderService implementations

        public void Create(OrderCrud orderCrud)
        {
            Order order = this.mapper.Map<Order>(orderCrud);
            this.repository.Save<Order>(order);

            this.repository.SaveChanges();
        }

        public void Delete(int id)
        {
            IEnumerable<OrderItem> orderItems = this.repository.Select<OrderItem>()
                                                               .Where(oi => oi.OrderId == id);

            foreach (var orderItem in orderItems)
            {
                this.repository.Delete<OrderItem>(orderItem.Id);
            }

            this.repository.Delete<Order>(id);
            this.repository.SaveChanges();
        }

        public OrderCrud Edit(int id)
        {
            Order order = this.repository.Select<Order>(id);

            return this.mapper.Map<OrderCrud>(order);
        }

        public OrderView Select(int id)
        {
            Order order = this.repository.Select<Order>(id);

            return this.mapper.Map<OrderView>(order);
        }

        public IEnumerable<OrderView> Select()
        {
            return this.repository.Select<Order>()
                                  .ToList()
                                  .AsQueryable()
                                  .ProjectTo<OrderView>(this.mapper.ConfigurationProvider);
        }

        public void Update(OrderCrud orderCrud)
        {
            Order order = this.repository.Select<Order>(orderCrud.Id);
            IEnumerable<OrderItem> orderItems = this.repository.Select<OrderItem>()
                                                               .Where(oi => oi.OrderId == order.Id)
                                                               .ToList();

            order = this.mapper.Map<OrderCrud, Order>(orderCrud, order);

            // Save Order
            this.repository.Save<Order>(order);

            // Insert new OrderItems, Update existing ones
            foreach (var orderItemCrud in orderCrud.Items)
            {
                OrderItem orderItem;

                if (orderItems.Any(oi => oi.Id == orderItemCrud.Id))
                {
                    orderItem = orderItems.First(oi => oi.Id == orderItemCrud.Id);

                    orderItem = this.mapper.Map<OrderItemCrud, OrderItem>(orderItemCrud, orderItem);
                }
                else
                {
                    orderItem = this.mapper.Map<OrderItem>(orderItemCrud);
                    orderItem.OrderId = order.Id;
                }

                this.repository.Save<OrderItem>(orderItem);
            }

            // Delete OrderItems
            IEnumerable<OrderItem> orderItemsForDelete = orderItems.Where(oi => !orderCrud.Items
                                                                                          .Select(i => i.Id)
                                                                                          .Contains(oi.Id));
            foreach (var orderItemForDelete in orderItemsForDelete)
            {
                this.repository.Delete<OrderItem>(orderItemForDelete.Id);
            }

            this.repository.SaveChanges();
        }

        #endregion
    }
}
