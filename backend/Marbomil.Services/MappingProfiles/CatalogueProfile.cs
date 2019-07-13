using AutoMapper;
using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Services.MappingProfiles
{
    public class CatalogueProfile : Profile
    {
        public CatalogueProfile()
        {
            CreateMap<CatalogueCrud, Catalogue>();
            CreateMap<Catalogue, CatalogueCrud>().ForMember(dest => dest.File, opt => opt.MapFrom(src => Utility.ReadFile(src.FileUrl)))
                                                 .ForMember(dest => dest.FileExtension, opt => opt.MapFrom(src => Utility.ReadFileExtension(src.FileUrl)));
            CreateMap<Catalogue, CatalogueView>();
        }
    }
}
