using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Dtos
{
    public class TokenData
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string TokenType { get; set; }
        public DateTime? Issued { get; set; }
        public DateTime? Expires { get; set; }
        public int ExpiresInSeconds { get; set; }
        public bool IsValid { get; set; }
        public string ErrorMessage { get; set; }
    }
}
