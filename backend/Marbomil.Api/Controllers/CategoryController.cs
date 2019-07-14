using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.Category;
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
    public class CategoryController : AdminController
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }


        [HttpGet]
        [Route("category")]
        [AllowAnonymous]
        public IEnumerable<CategoryViewModel> GetCategorys()
        {
            return this.categoryService.Select()
                                       .AsQueryable()
                                       .ProjectTo<CategoryViewModel>(this.mapper.ConfigurationProvider)
                                       .ToList();
        }

        [HttpGet]
        [Route("category/{id}")]
        [AllowAnonymous]
        public CategoryViewModel GetCategory(int id)
        {
            CategoryView category = this.categoryService.Select(id);

            return this.mapper.Map<CategoryViewModel>(category);
        }

        [HttpGet]
        [Route("category/edit/{id}")]
        public CategoryUpdateModel GetCategoryEdit(int id)
        {
            CategoryCrud category = this.categoryService.Edit(id);

            return this.mapper.Map<CategoryUpdateModel>(category);
        }

        [HttpPost]
        [Route("category")]
        [ModelValidation]
        public HttpResponseMessage CreateCategory(CategoryCreateModel categoryCreate)
        {
            this.logger.Debug("Create Category - start");

            CategoryCrud category = this.mapper.Map<CategoryCrud>(categoryCreate);

            this.categoryService.Create(category);

            this.logger.Debug("Create Category - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("category")]
        [ModelValidation]
        public HttpResponseMessage UpdateCategory(CategoryUpdateModel categoryUpdate)
        {
            this.logger.Debug("Update Category - start");

            CategoryCrud category = this.mapper.Map<CategoryCrud>(categoryUpdate);

            this.categoryService.Update(category);

            this.logger.Debug("Update Category - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("category/{id}")]
        public HttpResponseMessage DeleteCategory(int id)
        {
            this.logger.Debug("Delete Category - start");

            this.categoryService.Delete(id);

            this.logger.Debug("Delete Category - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
