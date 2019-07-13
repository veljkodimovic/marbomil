using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Database
{
    public class Collection : IDbEntity
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Title { get; set; }

        [MaxLength(1000)]
        public string ImageUrl { get; set; }

        [MaxLength(1000)]
        public string ImageCropUrl { get; set; }

        public int? CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
