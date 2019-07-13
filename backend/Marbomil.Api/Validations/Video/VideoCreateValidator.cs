using FluentValidation;
using Marbomil.Api.Models.Video;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Video
{
    public class VideoCreateValidator : AbstractValidator<VideoCreateModel>
    {
        private readonly IVideoService videoService;

        public VideoCreateValidator(IVideoService videoService)
        {
            this.videoService = videoService;

            RuleFor(vid => vid.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                     .NotEmpty()
                                     .MaximumLength(100)
                                     .Must(ValidateTitle)
                                     .WithMessage("Video with passed Title already exists in the database.");
        }

        private bool ValidateTitle(string title)
        {
            return !this.videoService.Select()
                                     .Any(vid => vid.Title == title);
        }
    }
}
