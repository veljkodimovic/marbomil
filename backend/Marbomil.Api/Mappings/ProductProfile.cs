using AutoMapper;
using Marbomil.Api.Models.Product;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Mappings
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<ProductCreateModel, ProductCrud>().ForMember(dest => dest.DrawingImage, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.DrawingImage)));
            CreateMap<ProductUpdateModel, ProductCrud>().ForMember(dest => dest.DrawingImage, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.DrawingImage)));
            CreateMap<ProductCrudView, ProductEditViewModel>().ForMember(dest => dest.DrawingImage, opt => opt.MapFrom(src => Utility.ConvertToBase64(src.DrawingImage)));
            CreateMap<ProductView, ProductViewModel>();
            CreateMap<ProductImageCreateModel, ProductImageCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.Image)))
                                                                  .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.ImageCrop)));
            CreateMap<ProductImageUpdateModel, ProductImageCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.Image)))
                                                                  .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.ImageCrop)));
            CreateMap<ProductImageCrud, ProductImageUpdateModel>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ConvertToBase64(src.Image)))
                                                                  .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ConvertToBase64(src.ImageCrop)));
            CreateMap<ProductImageView, ProductImageViewModel>();
        }
    }
}
