using AutoMapper;
using Marbomil.Api.Models.Banner;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Mappings
{
    public class BanerProfile : Profile
    {
        public BanerProfile()
        {
            CreateMap<BannerCreateModel, BannerCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.Image)))
                                                      .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.ImageCrop)));
            CreateMap<BannerUpdateModel, BannerCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.Image)))
                                                      .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.ImageCrop)));
            CreateMap<BannerCrud, BannerUpdateModel>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertToBase64(src.Image)))
                                                      .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertToBase64(src.ImageCrop)));
            CreateMap<BannerView, BannerViewModel>();
        }
    }
}
