using AutoMapper;
using Marbomil.Api.Models.Collection;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Mappings
{
    public class CollectionProfile : Profile
    {
        public CollectionProfile()
        {
            CreateMap<CollectionCreateModel, CollectionCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.Image)))
                                                              .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.ImageCrop)));
            CreateMap<CollectionUpdateModel, CollectionCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.Image)))
                                                              .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.ImageCrop)));
            CreateMap<CollectionCrud, CollectionUpdateModel>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertToBase64(src.Image)))
                                                              .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertToBase64(src.ImageCrop)));
            CreateMap<CollectionView, CollectionViewModel>();
        }
    }
}
