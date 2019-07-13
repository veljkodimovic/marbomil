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
    public class VideoUpdateValidator : AbstractValidator<VideoUpdateModel>
    {
        private readonly IVideoService videoService;

        public VideoUpdateValidator(IVideoService videoService)
        {
            this.videoService = videoService;

            RuleFor(vid => vid.Id).Cascade(CascadeMode.StopOnFirstFailure)
                                  .NotEmpty()
                                  .Must(ValidateId)
                                  .WithMessage("Video with passed Id does not exists in the database.");
            RuleFor(vid => vid.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                     .NotEmpty()
                                     .MaximumLength(100)
                                     .Must((videoData, title) => ValidateTitle(videoData, title))
                                     .WithMessage("Video with passed Title already exists in the database.");
        }

        private bool ValidateId(int id)
        {
            return this.videoService.Select()
                                    .Any(vid => vid.Id == id);
        }

        private bool ValidateTitle(VideoUpdateModel videoData, string title)
        {
            return !this.videoService.Select()
                                     .Any(vid => vid.Id != videoData.Id
                                                 &&
                                                 vid.Title == title);
        }
    }
}
