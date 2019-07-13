using AutoMapper;
using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Entities.Dtos;

namespace Marbomil.Services.MappingProfiles
{
    public class CollectionProfile : Profile
    {
        public CollectionProfile()
        {
            CreateMap<CollectionCrud, Collection>();
            CreateMap<Collection, CollectionCrud>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Utility.ReadFile(src.ImageUrl)))
                                                   .ForMember(dest => dest.ImageCrop, opt => opt.MapFrom(src => Utility.ReadFile(src.ImageCropUrl)))
                                                   .ForMember(dest => dest.ImageExtension, opt => opt.MapFrom(src => Utility.ReadFileExtension(src.ImageUrl)));
            CreateMap<Collection, CollectionView>();
        }
    }
}
