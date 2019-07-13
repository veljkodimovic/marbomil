using Autofac;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Validations
{
    public class ValidatorFactory : ValidatorFactoryBase
    {
        private readonly IComponentContext context;

        public ValidatorFactory(IComponentContext context)
        {
            this.context = context;
        }

        public override IValidator CreateInstance(Type validatorType)
        {
            IValidator validator = this.context.ResolveOptionalKeyed<IValidator>(validatorType);

            return validator;
        }
    }
}
