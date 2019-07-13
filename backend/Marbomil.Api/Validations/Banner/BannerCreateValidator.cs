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
    public class BannerCreateValidator : AbstractValidator<BannerCreateModel>
    {
        private readonly IBannerService bannerService;

        public BannerCreateValidator(IBannerService bannerService)
        {
            this.bannerService = bannerService;

            RuleFor(bann => bann.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                       .NotEmpty()
                                       .MaximumLength(100)
                                       .Must(ValidateTitle)
                                       .WithMessage("Banner with passed Title already exists in the database.");
        }

        private bool ValidateTitle(string title)
        {
            return !this.bannerService.Select()
                                      .Any(bann => bann.Title == title);
        }
    }
}
