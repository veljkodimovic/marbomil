using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Managers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Domain.Security.Providers
{
    public class TokenAuthenticationServiceProvider : OAuthAuthorizationServerProvider
    {

        #region Private methods
        
        #endregion

        #region Overriden methods

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            string clientId = string.Empty;
            string clientSecret = string.Empty;

            // Extract clientId and clientSecret
            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
            {
                context.TryGetFormCredentials(out clientId, out clientSecret);
            }

            context.OwinContext
                   .Set<string>("refreshTokenLifeTimeInMinutes", ConfigurationManager.AppSettings["RefreshTokenExpiresInMinutes"]);

            context.Validated();

            return Task.FromResult(0);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            ApplicationSignInManager signInManager = context.OwinContext
                                                            .Get<ApplicationSignInManager>();

            User user = await signInManager.UserManager
                                           .FindAsync(context.UserName, context.Password);
            
            if (user != null)
            {
                ClaimsIdentity userIdentity = await signInManager.UserManager
                                                                 .CreateIdentityAsync(user, DefaultAuthenticationTypes.ExternalBearer);
                AuthenticationProperties authenticationProperties = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                        "client_id", context.ClientId
                    }
                });

                AuthenticationTicket authenticationTicket = new AuthenticationTicket(userIdentity, authenticationProperties);

                context.Validated(authenticationTicket);
            }
            else
            {
                context.SetError("invalid_grant", "The username or password is incorect");
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (var property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult(0);
        }

        public override Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            string originalClientId = context.Ticket.Properties.Dictionary["client_id"];
            string currentClientId = context.ClientId;

            if (originalClientId != currentClientId)
            {
                context.SetError("invalid_clientId", "Refresh Token is issued to a different clientId.");
            }
            else
            {
                context.Validated(context.Ticket);
            }

            return Task.FromResult(0);
        }

        #endregion

    }
}
