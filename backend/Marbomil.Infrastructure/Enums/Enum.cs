using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Enums
{
    public enum MarbomilFolders
    {
        Undefined = 0,
        Attest = 1,
        Banner = 2,
        Catalogue = 3,
        Category = 4,
        Collection = 5,
        Video = 6,
        Product = 7
    }

    public enum UserRoles
    {
        Undefined = 0,
        Admin = 1,
        Manager = 2,
        ProductionLeader = 3,
        ProductionWorker = 4,
        WarehouseOperator = 5,
        HR = 6,
        Buyer = 7
    }

    public enum OrderStatus
    {
        Undefined = 0,
        ReadyForProcessing = 1,
        Accepted = 2,
        Rejected = 3,
        Completed = 4
    }
}
