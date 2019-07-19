﻿using AutoMapper;
using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Services.MappingProfiles
{
    public class BannerProfile : Profile
    {
        public BannerProfile()
        {
            CreateMap<BannerCrud, Banner>();
            CreateMap<Banner, BannerCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ReadFile(src.ImageUrl)))
                                           .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ReadFile(src.ImageCropUrl)))
                                           .ForMember(dest => dest.ImageExtension, opt => opt.MapFrom(src => Utility.ReadFileExtension(src.ImageUrl)));
            CreateMap<Banner, BannerView>();
        }
    }
}