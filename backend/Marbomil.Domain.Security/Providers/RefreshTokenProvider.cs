using Marbomil.Infrastructure;
using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Helpers;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Domain.Security.Providers
{
    public class RefreshTokenProvider : IAuthenticationTokenProvider
    {
        public void Create(AuthenticationTokenCreateContext context)
        { }

        public Task CreateAsync(AuthenticationTokenCreateContext context)
        {
            string clientId = context.Ticket.Properties.Dictionary["client_id"];

            if (!string.IsNullOrWhiteSpace(clientId))
            {
                string refreshTokenId = Guid.NewGuid()
                                            .ToString();
                string refreshTokenLifeTimeInMinutes = context.OwinContext
                                                              .Get<string>("refreshTokenLifeTimeInMinutes");
                IRepository tokenRepository = context.OwinContext
                                                     .Get<IRepository>();

                RefreshToken newRefreshToken = new RefreshToken
                {
                    RefreshTokenHash = HashUtil.Hash(refreshTokenId),
                    Username = context.Ticket.Identity.Name,
                    ApplicationClientId = clientId,
                    Issued = DateTime.UtcNow,
                    Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(refreshTokenLifeTimeInMinutes))
                };

                context.Ticket.Properties.IssuedUtc = newRefreshToken.Issued;
                context.Ticket.Properties.ExpiresUtc = newRefreshToken.Expires;

                newRefreshToken.ProtectedTicket = context.SerializeTicket();

                bool tokenAlreadyExists = tokenRepository.Select<RefreshToken>()
                                                         .Any(rt => rt.Username.Equals(newRefreshToken.Username)
                                                                    &&
                                                                    rt.ApplicationClientId.Equals(newRefreshToken.ApplicationClientId));
                if (tokenAlreadyExists)
                {
                    RefreshToken oldRefreshToken = tokenRepository.Select<RefreshToken>()
                                                                  .First(rt => rt.Username.Equals(newRefreshToken.Username)
                                                                               &&
                                                                               rt.ApplicationClientId.Equals(newRefreshToken.ApplicationClientId));

                    tokenRepository.Delete<RefreshToken>(oldRefreshToken.Id);
                }

                tokenRepository.Save<RefreshToken>(newRefreshToken);
                tokenRepository.SaveChanges();

                context.SetToken(refreshTokenId);
            }

            return Task.FromResult(0);
        }
    

        public void Receive(AuthenticationTokenReceiveContext context)
        { }

        public Task ReceiveAsync(AuthenticationTokenReceiveContext context)
        {
            string hashedRefreshTokenId = HashUtil.Hash(context.Token);
            IRepository tokenRepository = context.OwinContext
                                                 .Get<IRepository>();
            bool tokenExistsByHashValue = tokenRepository.Select<RefreshToken>()
                                                         .Any(rt => rt.RefreshTokenHash
                                                                      .Equals(hashedRefreshTokenId));

            if (tokenExistsByHashValue)
            {
                RefreshToken refreshToken = tokenRepository.Select<RefreshToken>()
                                                           .First(rt => rt.RefreshTokenHash
                                                                          .Equals(hashedRefreshTokenId));

                context.DeserializeTicket(refreshToken.ProtectedTicket);

                tokenRepository.Delete<RefreshToken>(refreshToken.Id);
                tokenRepository.SaveChanges();
            }

            return Task.FromResult(0);
        }
    }
}
