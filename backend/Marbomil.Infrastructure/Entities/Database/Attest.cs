﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Database
{
    public class Attest : IDbEntity
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Title { get; set; }

        public string Description { get; set; }

        [MaxLength(1000)]
        public string FileUrl { get; set; }
    }
}
