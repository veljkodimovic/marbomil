using AutoMapper;
using Marbomil.Api.Models.Video;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Mappings
{
    public class VideoProfile : Profile
    {
        public VideoProfile()
        {
            CreateMap<VideoCreateModel, VideoCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.Image)))
                                                    .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.ImageCrop)));
            CreateMap<VideoUpdateModel, VideoCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.Image)))
                                                    .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.ImageCrop)));
            CreateMap<VideoCrud, VideoUpdateModel>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertToBase64(src.Image)))
                                                    .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertToBase64(src.ImageCrop)));
            CreateMap<VideoView, VideoViewModel>();
        }
    }
}
