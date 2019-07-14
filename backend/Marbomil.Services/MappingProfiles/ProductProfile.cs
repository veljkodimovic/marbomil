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
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<ProductCrud, Product>().ForMember(dest => dest.Images, opt => opt.Ignore());
            CreateMap<Product, ProductCrud>().ForMember(dest => dest.DrawingImage, opt => opt.MapFrom(src => Utility.ReadFile(src.DrawingImageUrl)))
                                             .ForMember(dest => dest.DrawingImageExtension, opt => opt.MapFrom(src => Utility.ReadFileExtension(src.DrawingImageUrl)));
            CreateMap<Product, ProductCrudView>().ForMember(dest => dest.DrawingImage, opt => opt.MapFrom(src => Utility.ReadFile(src.DrawingImageUrl)))
                                                 .ForMember(dest => dest.DrawingImageExtension, opt => opt.MapFrom(src => Utility.ReadFileExtension(src.DrawingImageUrl)));
            CreateMap<Product, ProductView>();
            CreateMap<ProductImageCrud, ProductImage>();
            CreateMap<ProductImage, ProductImageCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ReadFile(src.ImageUrl)))
                                                       .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ReadFile(src.ImageCropUrl)))
                                                       .ForMember(dest => dest.ImageExtension, opt => opt.MapFrom(src => Utility.ReadFileExtension(src.ImageUrl)));
            CreateMap<ProductImage, ProductImageView>();
        }
    }
}
