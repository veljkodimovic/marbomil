using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Models.Product
{
    public class ProductImageUpdateModel
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Index { get; set; }
        public string Image { get; set; }
        public string ImageCrop { get; set; }
        public string ImageExtension { get; set; }
    }
}
