using AutoMapper.QueryableExtensions;
using Marbomil.Api.Attributes;
using Marbomil.Api.Models.Collection;
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
    public class CollectionController : AdminController
    {
        private readonly ICollectionService collectionService;

        public CollectionController(ICollectionService collectionService)
        {
            this.collectionService = collectionService;
        }


        [HttpGet]
        [Route("collection")]
        [AllowAnonymous]
        public IEnumerable<CollectionViewModel> GetCollections()
        {
            return this.collectionService.Select()
                                     .AsQueryable()
                                     .ProjectTo<CollectionViewModel>(this.mapper.ConfigurationProvider)
                                     .ToList();
        }

        [HttpGet]
        [Route("collection/{id}")]
        [AllowAnonymous]
        public CollectionViewModel GetCollection(int id)
        {
            CollectionView collection = this.collectionService.Select(id);

            return this.mapper.Map<CollectionViewModel>(collection);
        }

        [HttpGet]
        [Route("collection/edit/{id}")]
        public CollectionUpdateModel GetCollectionEdit(int id)
        {
            CollectionCrud collection = this.collectionService.Edit(id);

            return this.mapper.Map<CollectionUpdateModel>(collection);
        }

        [HttpPost]
        [Route("collection")]
        [ModelValidation]
        public HttpResponseMessage CreateCollection(CollectionCreateModel collectionCreate)
        {
            this.logger.Debug("Create Collection - start");

            CollectionCrud collection = this.mapper.Map<CollectionCrud>(collectionCreate);

            this.collectionService.Create(collection);

            this.logger.Debug("Create Collection - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Route("collection")]
        [ModelValidation]
        public HttpResponseMessage UpdateCollection(CollectionUpdateModel collectionUpdate)
        {
            this.logger.Debug("Update Collection - start");

            CollectionCrud collection = this.mapper.Map<CollectionCrud>(collectionUpdate);

            this.collectionService.Update(collection);

            this.logger.Debug("Update Collection - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("collection/{id}")]
        public HttpResponseMessage DeleteCollection(int id)
        {
            this.logger.Debug("Delete Collection - start");

            this.collectionService.Delete(id);

            this.logger.Debug("Delete Collection - end");

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
