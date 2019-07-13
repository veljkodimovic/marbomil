using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.Product;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Services;
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
    public class ProductController : AdminController
    {
        private readonly IProductService productService;

        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }


        [HttpGet]
        [Route("product")]
        [AllowAnonymous]
        public IEnumerable<ProductViewModel> GetProducts()
        {
            return this.productService.Select()
                                     .AsQueryable()
                                     .ProjectTo<ProductViewModel>(this.mapper.ConfigurationProvider)
                                     .ToList();
        }

        [HttpGet]
        [Route("product/{id}")]
        [AllowAnonymous]
        public ProductViewModel GetProduct(int id)
        {
            ProductView product = this.productService.Select(id);

            return this.mapper.Map<ProductViewModel>(product);
        }

        [HttpGet]
        [Route("product/edit/{id}")]
        public ProductEditViewModel GetProductEdit(int id)
        {
            ProductCrudView productCrudView = this.productService.EditView(id);

            return this.mapper.Map<ProductEditViewModel>(productCrudView);
        }

        [HttpGet]
        [Route("product/edit/image/{id}")]
        public ProductImageUpdateModel GetProductImageEdit(int id)
        {
            ProductImageCrud productImageCrud = this.productService.EditImage(id);

            return this.mapper.Map<ProductImageUpdateModel>(productImageCrud);
        }

        [HttpPost]
        [Route("product")]
        [ModelValidation]
        public HttpResponseMessage CreateProduct(ProductCreateModel productCreate)
        {
            this.logger.Debug("Create Product - start");

            ProductCrud product = this.mapper.Map<ProductCrud>(productCreate);

            this.productService.Create(product);

            this.logger.Debug("Create Product - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("product")]
        [ModelValidation]
        public HttpResponseMessage UpdateProduct(ProductUpdateModel productUpdate)
        {
            this.logger.Debug("Update Product - start");

            ProductCrud product = this.mapper.Map<ProductCrud>(productUpdate);

            this.productService.Update(product);

            this.logger.Debug("Update Product - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("product/{id}")]
        public HttpResponseMessage DeleteProduct(int id)
        {
            this.logger.Debug("Delete Product - start");

            this.productService.Delete(id);

            this.logger.Debug("Delete Product - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
