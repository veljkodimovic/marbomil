using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Models.Catalogue
{
    public class CatalogueCreateModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Version { get; set; }
        public string File { get; set; }
        public string FileExtension { get; set; }
    }
}
