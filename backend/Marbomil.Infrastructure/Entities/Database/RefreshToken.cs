using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Database
{
    public class RefreshToken : IDbEntity
    {
        public int Id { get; set; }
        public string RefreshTokenHash { get; set; }
        public string Username { get; set; }
        public string ApplicationClientId { get; set; }
        public DateTime Issued { get; set; }
        public DateTime Expires { get; set; }
        public string ProtectedTicket { get; set; }
    }
}
