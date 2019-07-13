using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Services
{
    public class LoginService : ILoginService
    {

        #region Private methods

        private string GenerateTokenUrl()
        {
            string port = ConfigurationManager.AppSettings["Port"];
            string tokenendPoint = ConfigurationManager.AppSettings["TokenUrlPath"];

            return $"http://localhost:{port}{tokenendPoint}";
        }

        private FormUrlEncodedContent GenerateLoginContent(string username, string password)
        {
            List<KeyValuePair<string, string>> requestParameters = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("username", username),
                new KeyValuePair<string, string>("password", password),
                new KeyValuePair<string, string>("client_id", "marbomil")
            };

            return new FormUrlEncodedContent(requestParameters);
        }

        private FormUrlEncodedContent GenerateRefreshTokenContent(string refreshToken)
        {
            List<KeyValuePair<string, string>> requestParameters = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("grant_type", "refresh_token"),
                new KeyValuePair<string, string>("refresh_token", refreshToken),
                new KeyValuePair<string, string>("client_id", "marbomil")
            };

            return new FormUrlEncodedContent(requestParameters);
        }

        private TokenData ReadTokenData(HttpResponseMessage response)
        {
            TokenData tokenData;
            dynamic responseData = JsonConvert.DeserializeObject(response.Content
                                                                             .ReadAsStringAsync()
                                                                             .Result);

            if (response.StatusCode == HttpStatusCode.OK)
            {
                tokenData = new TokenData()
                {
                    AccessToken = responseData.access_token,
                    RefreshToken = responseData.refresh_token,
                    TokenType = responseData.token_type,
                    Issued = responseData[".issued"],
                    Expires = responseData[".expires"],
                    ExpiresInSeconds = responseData.expires_in,
                    IsValid = true
                };
            }
            else
            {
                tokenData = new TokenData
                {
                    ErrorMessage = responseData.error
                };
            }

            return tokenData;
        }

        #endregion

        #region ILoginService implementation

        public TokenData Validate(string username, string password)
        {
            TokenData tokenData;

            using (HttpClient client = new HttpClient())
            {
                string tokenUrl = this.GenerateTokenUrl();

                FormUrlEncodedContent loginContent = this.GenerateLoginContent(username, password);
                HttpResponseMessage response = client.PostAsync(tokenUrl, loginContent).Result;

                tokenData = this.ReadTokenData(response);
            }

            return tokenData;
        }

        public TokenData Validate(string refreshToken)
        {
            TokenData tokenData;

            using (HttpClient client = new HttpClient())
            {
                string tokenUrl = this.GenerateTokenUrl();

                FormUrlEncodedContent loginContent = this.GenerateRefreshTokenContent(refreshToken);
                HttpResponseMessage response = client.PostAsync(tokenUrl, loginContent).Result;

                tokenData = this.ReadTokenData(response);
            }

            return tokenData;
        }

        #endregion
    }
}
