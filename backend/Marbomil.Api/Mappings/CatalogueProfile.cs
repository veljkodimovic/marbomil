using AutoMapper;
using Marbomil.Api.Models.Catalogue;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Mappings
{
    public class CatalogueProfile : Profile
    {
        public CatalogueProfile()
        {
            CreateMap<CatalogueCreateModel, CatalogueCrud>().ForMember(dest => dest.File, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.File)));
            CreateMap<CatalogueUpdateModel, CatalogueCrud>().ForMember(dest => dest.File, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.File)));
            CreateMap<CatalogueView, CatalogueViewModel>();
        }
    }
}
