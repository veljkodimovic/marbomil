using AutoMapper;
using Marbomil.Api.Models.Category;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Mappings
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<CategoryCreateModel, CategoryCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.Image)))
                                                          .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.ImageCrop)));
            CreateMap<CategoryUpdateModel, CategoryCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.Image)))
                                                          .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.ImageCrop)));
            CreateMap<CategoryCrud, CategoryUpdateModel>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertToBase64(src.Image)))
                                                          .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertToBase64(src.ImageCrop)));
            CreateMap<CategoryView, CategoryViewModel>();
        }
    }
}
