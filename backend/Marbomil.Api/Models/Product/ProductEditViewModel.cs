﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marbomil.Api.Models.Product
{
    /// <summary>
    /// Light edit Product model which is used to show the Product in the Edit mode, but without full Images load in Base64, but in ProductImage view mode where images are load by Urls
    /// </summary>
    public class ProductEditViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public int? OrderNumber { get; set; }
        public string Description { get; set; }
        public string Dimension { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public DateTime? DiscountDate { get; set; }
        public int? CollectionId { get; set; }
        public int CategoryId { get; set; }
        public int NumberOnSite { get; set; }
        public string DrawingImage { get; set; }
        public string DrawingImageExtension { get; set; }
        public IEnumerable<ProductImageViewModel> Images { get; set; }
    }
}