using AutoMapper;
using Marbomil.Api.Models.Attest;
using Marbomil.Infrastructure.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Mappings
{
    public class AttestProfile : Profile
    {
        public AttestProfile()
        {
            CreateMap<AttestCreateModel, AttestCrud>().ForMember(dest => dest.File, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.File)));
            CreateMap<AttestUpdateModel, AttestCrud>().ForMember(dest => dest.File, opt => opt.MapFrom(src => Utility.ConvertFromBase64(src.File)));
            CreateMap<AttestView, AttestViewModel>();
        }
    }
}
