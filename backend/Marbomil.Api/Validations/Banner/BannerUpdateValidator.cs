using FluentValidation;
using Marbomil.Api.Models.Banner;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Banner
{
    public class BannerUpdateValidator : AbstractValidator<BannerUpdateModel>
    {
        private readonly IBannerService bannerService;

        public BannerUpdateValidator(IBannerService bannerService)
        {
            this.bannerService = bannerService;

            RuleFor(bann => bann.Id).Cascade(CascadeMode.StopOnFirstFailure)
                                    .NotEmpty()
                                    .Must(ValidateId)
                                    .WithMessage("Banner with passed Id does not exists in the database.");
            RuleFor(bann => bann.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                       .NotEmpty()
                                       .MaximumLength(100)
                                       .Must((bannerData, title) => ValidateTitle(bannerData, title))
                                       .WithMessage("Banner with passed Title already exists in the database.");
        }

        private bool ValidateId(int id)
        {
            return this.bannerService.Select()
                                     .Any(bann => bann.Id == id);
        }

        private bool ValidateTitle(BannerUpdateModel bannerData, string title)
        {
            return !this.bannerService.Select()
                                      .Any(bann => bann.Id != bannerData.Id
                                                   &&
                                                   bann.Title == title);
        }
    }
}
