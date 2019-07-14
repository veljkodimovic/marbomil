using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Services
{
    public interface IProductService : IServiceBase<ProductCrud, ProductView>
    {
        /// <summary>
        /// Function which returns all data of the Product, including the DrawingImage in bytes array. However, the Product Images are returned as View Dto,
        /// with Images Urls. This is a lighter version of returning data for edir
        /// </summary>
        /// <param name="id">Product id</param>
        ProductCrudView EditView(int id);

        ProductImageCrud EditImage(int id);
    }
}
