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
    public class AttestProfile : Profile
    {
        public AttestProfile()
        {
            CreateMap<AttestCrud, Attest>();
            CreateMap<Attest, AttestCrud>().ForMember(dest => dest.File, opt => opt.MapFrom(src => Utility.ReadFile(src.FileUrl)))
                                           .ForMember(dest => dest.FileExtension, opt => opt.MapFrom(src => Utility.ReadFile(src.FileUrl)));
            CreateMap<Attest, AttestView>();
        }
    }
}
