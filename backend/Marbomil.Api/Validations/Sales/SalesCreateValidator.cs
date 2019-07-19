﻿using FluentValidation;
using Marbomil.Api.Models.Sales;
using Marbomil.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations.Sales
{
    public class SalesCreateValidator : AbstractValidator<SalesCreateModel>
    {
        private readonly ISalesService salesService;

        public SalesCreateValidator(ISalesService salesService)
        {
            this.salesService = salesService;

            RuleFor(sal => sal.Title).Cascade(CascadeMode.StopOnFirstFailure)
                                     .NotEmpty()
                                     .MaximumLength(100)
                                     .Must(ValidateTitle)
                                     .WithMessage("Sales with passed Title already exists in the database.");
            RuleFor(sal => sal.Street).MaximumLength(200);
            RuleFor(sal => sal.City).MaximumLength(100);
            RuleFor(sal => sal.PostalCode).MaximumLength(50);
            RuleFor(sal => sal.Region).MaximumLength(100);
            RuleFor(sal => sal.Country).MaximumLength(100);
            RuleFor(sal => sal.Latitude).MaximumLength(100);
            RuleFor(sal => sal.Longitude).MaximumLength(100);
            RuleFor(sal => sal.Phone).MaximumLength(50);
            RuleFor(sal => sal.Email).MaximumLength(50);
            RuleFor(sal => sal.Website).MaximumLength(50);
        }

        private bool ValidateTitle(string title)
        {
            return !this.salesService.Select()
                                     .Any(sal => sal.Title == title);
        }
    }
}