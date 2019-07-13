using Marbomil.Domain.Security.Providers;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Domain.Security
{
    public static class AuthenticationConfig
    {
        public static OAuthAuthorizationServerOptions GetOAuthAuthorizationServerOptions()
        {
            return new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString(ConfigurationManager.AppSettings["TokenUrlPath"]),
                Provider = new TokenAuthenticationServiceProvider(),
                RefreshTokenProvider = new RefreshTokenProvider(),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(int.Parse(ConfigurationManager.AppSettings["AccessTokenExpireInMinutes"])),
                AllowInsecureHttp = true
            };
        }
    }
}
