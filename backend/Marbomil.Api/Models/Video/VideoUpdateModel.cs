using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Models.Video
{
    public class VideoUpdateModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string ImageCrop { get; set; }
        public string ImageExtension { get; set; }
        public string Url { get; set; }
    }
}
