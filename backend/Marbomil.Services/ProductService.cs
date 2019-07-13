using AutoMapper.QueryableExtensions;
using Marbomil.Infrastructure;
using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Enums;
using Marbomil.Infrastructure.Files;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Services
{
    public class ProductService : ServiceBase, IProductService
    {
        private readonly IRepository repository;
        private readonly IFileManager fileManager;

        public ProductService(IRepository repository, IFileManager fileManager)
        {
            this.repository = repository;
            this.fileManager = fileManager;
        }


        #region Private methods

        private void SetOrderNumbers(Product productData)
        {
            // Retrieve products within the same Category and with OrderNumbers greater or equal 
            IEnumerable<Product> products = this.repository.Select<Product>()
                                                           .Where(p => p.Id != productData.Id
                                                                       &&
                                                                       p.CategoryId == productData.CategoryId
                                                                       &&
                                                                       p.OrderNumber.HasValue
                                                                       &&
                                                                       p.OrderNumber >= productData.OrderNumber)
                                                           .OrderBy(p => p.OrderNumber);

            if (products.Any())
            {
                int startingOrderNumber = products.First()
                                                  .OrderNumber
                                                  .Value + 1;

                foreach (var product in products)
                {
                    product.OrderNumber = startingOrderNumber;

                    startingOrderNumber++;
                }
            }
        }

        #endregion

        #region IProductService implementations

        public void Create(ProductCrud productCrud)
        {
            Product product = this.mapper.Map<Product>(productCrud);
            this.repository.Save<Product>(product);

            // Setting OrderNumbers
            if (product.OrderNumber.HasValue)
            {
                this.SetOrderNumbers(product);
            }

            this.repository.SaveChanges();

            if (productCrud.DrawingImage != null
                &&
                productCrud.DrawingImage.Length > 0)
            {
                product.DrawingImageUrl = this.fileManager.CreateEntityFile(product.Id, productCrud.DrawingImage, productCrud.DrawingImageExtension, MarbomilFolders.Product);

                this.repository.Save<Product>(product);
            }


            // Product images
            IEnumerable<ProductImageCrud> imagesToInsert = productCrud.Images
                                                                      .Where(prodImg => prodImg.Image != null
                                                                                        &&
                                                                                        prodImg.Image.Length > 0
                                                                                        &&
                                                                                        prodImg.ImageCrop != null
                                                                                        &&
                                                                                        prodImg.ImageCrop.Length > 0);
            foreach (var image in productCrud.Images)
            {
                ProductImage productImage = new ProductImage
                {
                    ProductId = product.Id,
                    Index = image.Index,
                    ImageUrl = this.fileManager.CreateEntityFile(product.Id, image.Image, image.ImageExtension, MarbomilFolders.Product),
                    ImageCropUrl = this.fileManager.CreateEntityFile(product.Id, image.ImageCrop, image.ImageExtension, MarbomilFolders.Product)
                };

                this.repository.Save<ProductImage>(productImage);
            }

            this.repository.Save<Product>(product);
            this.repository.SaveChanges();
        }

        public void Delete(int id)
        {
            IQueryable<ProductImage> images = this.repository.Select<ProductImage>()
                                                             .Where(img => img.ProductId == id);
            foreach (var image in images)
            {
                this.repository.Delete<ProductImage>(image.Id);
            }

            this.repository.Delete<Product>(id);
            this.fileManager.DeleteEntityFilesFolder(id, MarbomilFolders.Product);
            this.repository.SaveChanges();
        }

        public ProductCrud Edit(int id)
        {
            Product product = this.repository.Select<Product>(id);

            return this.mapper.Map<ProductCrud>(product);
        }

        public ProductImageCrud EditImage(int id)
        {
            ProductImage productImage = this.repository.Select<ProductImage>(id);

            return this.mapper.Map<ProductImageCrud>(productImage);
        }

        public ProductCrudView EditView(int id)
        {
            Product product = this.repository.Select<Product>(id);

            return this.mapper.Map<ProductCrudView>(product);
        }

        public ProductView Select(int id)
        {
            Product product = this.repository.Select<Product>(id);

            return this.mapper.Map<ProductView>(product);
        }

        public IEnumerable<ProductView> Select()
        {
            return this.repository.Select<Product>()
                                  .ProjectTo<ProductView>(this.mapper.ConfigurationProvider);
        }

        public void Update(ProductCrud productCrud)
        {
            Product product = this.repository.Select<Product>(productCrud.Id);
            IEnumerable<ProductImage> productImages = this.repository.Select<ProductImage>()
                                                                     .Where(img => img.ProductId == product.Id)
                                                                     .ToList();

            product = this.mapper.Map<ProductCrud, Product>(productCrud, product);

            // Update DrawingImage
            if (productCrud.DrawingImage != null
                &&
                productCrud.DrawingImage.Length > 0)
            {
                product.DrawingImageUrl = !this.fileManager.ExistsEntityFile(product.DrawingImageUrl) ?
                    this.fileManager.CreateEntityFile(product.Id, productCrud.DrawingImage, productCrud.DrawingImageExtension, MarbomilFolders.Product)
                    :
                    this.fileManager.UpdateEntityFile(product.DrawingImageUrl, productCrud.DrawingImage, productCrud.DrawingImageExtension);
            }

            this.repository.Save<Product>(product);

            // Setting OrderNumbers
            if (product.OrderNumber.HasValue)
            {
                this.SetOrderNumbers(product);
            }

            // Inset new images, updates existing ones
            IEnumerable<ProductImageCrud> imagesToInsertOrUpdate = productCrud.Images
                                                                              .Where(img => img.Image != null
                                                                                            &&
                                                                                            img.Image.Length > 0
                                                                                            &&
                                                                                            img.ImageCrop != null
                                                                                            &&
                                                                                            img.ImageCrop.Length > 0);
            foreach (var image in imagesToInsertOrUpdate)
            {
                // Update existing product image
                if (productImages.Any(img => img.Id == image.Id))
                {
                    ProductImage productImage = productImages.First(img => img.Id == image.Id);
                    productImage = this.mapper.Map<ProductImageCrud, ProductImage>(image, productImage);

                    productImage.ImageUrl = !this.fileManager.ExistsEntityFile(productImage.ImageUrl) ?
                        this.fileManager.CreateEntityFile(product.Id, image.Image, image.ImageExtension, MarbomilFolders.Product)
                        :
                        this.fileManager.UpdateEntityFile(productImage.ImageUrl, image.Image, image.ImageExtension);

                    productImage.ImageCropUrl = !this.fileManager.ExistsEntityFile(productImage.ImageCropUrl) ?
                        this.fileManager.CreateEntityFile(product.Id, image.ImageCrop, image.ImageExtension, MarbomilFolders.Product)
                        :
                        this.fileManager.UpdateEntityFile(productImage.ImageCropUrl, image.ImageCrop, image.ImageExtension);

                    this.repository.Save<ProductImage>(productImage);
                }
                // Insert new product image
                else
                {
                    ProductImage productImage = new ProductImage
                    {
                        ProductId = product.Id,
                        Index = image.Index,
                        ImageUrl = this.fileManager.CreateEntityFile(product.Id, image.Image, image.ImageExtension, MarbomilFolders.Product),
                        ImageCropUrl = this.fileManager.CreateEntityFile(product.Id, image.ImageCrop, image.ImageExtension, MarbomilFolders.Product)
                    };

                    this.repository.Save<ProductImage>(productImage);
                }
            }

            // Delete product images
            IEnumerable<ProductImage> imagesToDelete = productImages.Where(img => !productCrud.Images.Select(dimg => dimg.Id)
                                                                                                     .Contains(img.Id));
            // Delete form the database
            foreach (var image in imagesToDelete)
            {
                this.repository.Delete<ProductImage>(image.Id);
            }

            // Commit all product images database changes
            this.repository.SaveChanges();

            // Delete image files of the deleted product images
            foreach (var image in imagesToDelete)
            {
                this.fileManager.DeleteFile(image.ImageUrl);
                this.fileManager.DeleteFile(image.ImageCropUrl);
            }
        }

        #endregion
    }
}
