using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Infrastructure.Entities.Dtos
{
    public class CategoryCrud : ICrudDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public byte[] Image { get; set; }
        public byte[] ImageCrop { get; set; }
        public string ImageExtension { get; set; }
    }
}
