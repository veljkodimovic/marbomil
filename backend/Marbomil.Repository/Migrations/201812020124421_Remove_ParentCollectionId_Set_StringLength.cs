namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Remove_ParentCollectionId_Set_StringLength : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Collections", "ParentCollectionId", "dbo.Collections");
            DropIndex("dbo.Collections", new[] { "ParentCollectionId" });
            AlterColumn("dbo.Attests", "Title", c => c.String(maxLength: 100));
            AlterColumn("dbo.Attests", "FileUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Banners", "Title", c => c.String(maxLength: 100));
            AlterColumn("dbo.Banners", "ImageUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Banners", "ImageCropUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Catalogues", "Title", c => c.String(maxLength: 100));
            AlterColumn("dbo.Catalogues", "Version", c => c.String(maxLength: 100));
            AlterColumn("dbo.Catalogues", "FileUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Categories", "Title", c => c.String(maxLength: 100));
            AlterColumn("dbo.Categories", "ImageUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Categories", "ImageCropUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Products", "Title", c => c.String(maxLength: 100));
            AlterColumn("dbo.Products", "Code", c => c.String(maxLength: 50));
            AlterColumn("dbo.Products", "DrawingImageUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Collections", "Title", c => c.String(maxLength: 100));
            AlterColumn("dbo.Collections", "ImageUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Collections", "ImageCropUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.ProductImages", "ImageUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.ProductImages", "ImageCropUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Sales", "Title", c => c.String(maxLength: 100));
            AlterColumn("dbo.Sales", "Street", c => c.String(maxLength: 200));
            AlterColumn("dbo.Sales", "City", c => c.String(maxLength: 100));
            AlterColumn("dbo.Sales", "PostalCode", c => c.String(maxLength: 50));
            AlterColumn("dbo.Sales", "Region", c => c.String(maxLength: 100));
            AlterColumn("dbo.Sales", "Country", c => c.String(maxLength: 100));
            AlterColumn("dbo.Sales", "Latitude", c => c.String(maxLength: 100));
            AlterColumn("dbo.Sales", "Longitude", c => c.String(maxLength: 100));
            AlterColumn("dbo.Sales", "Phone", c => c.String(maxLength: 50));
            AlterColumn("dbo.Sales", "Email", c => c.String(maxLength: 50));
            AlterColumn("dbo.Sales", "Website", c => c.String(maxLength: 50));
            AlterColumn("dbo.Services", "Title", c => c.String(maxLength: 100));
            AlterColumn("dbo.Services", "Street", c => c.String(maxLength: 200));
            AlterColumn("dbo.Services", "City", c => c.String(maxLength: 100));
            AlterColumn("dbo.Services", "PostalCode", c => c.String(maxLength: 50));
            AlterColumn("dbo.Services", "Region", c => c.String(maxLength: 100));
            AlterColumn("dbo.Services", "Country", c => c.String(maxLength: 100));
            AlterColumn("dbo.Services", "Latitude", c => c.String(maxLength: 100));
            AlterColumn("dbo.Services", "Longitude", c => c.String(maxLength: 100));
            AlterColumn("dbo.Services", "Phone", c => c.String(maxLength: 50));
            AlterColumn("dbo.Services", "Email", c => c.String(maxLength: 50));
            AlterColumn("dbo.Services", "Website", c => c.String(maxLength: 50));
            AlterColumn("dbo.Videos", "Title", c => c.String(maxLength: 100));
            AlterColumn("dbo.Videos", "ImageUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Videos", "ImageCropUrl", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Videos", "Url", c => c.String(maxLength: 1000));
            DropColumn("dbo.Collections", "ParentCollectionId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Collections", "ParentCollectionId", c => c.Int());
            AlterColumn("dbo.Videos", "Url", c => c.String());
            AlterColumn("dbo.Videos", "ImageCropUrl", c => c.String());
            AlterColumn("dbo.Videos", "ImageUrl", c => c.String());
            AlterColumn("dbo.Videos", "Title", c => c.String());
            AlterColumn("dbo.Services", "Website", c => c.String());
            AlterColumn("dbo.Services", "Email", c => c.String());
            AlterColumn("dbo.Services", "Phone", c => c.String());
            AlterColumn("dbo.Services", "Longitude", c => c.String());
            AlterColumn("dbo.Services", "Latitude", c => c.String());
            AlterColumn("dbo.Services", "Country", c => c.String());
            AlterColumn("dbo.Services", "Region", c => c.String());
            AlterColumn("dbo.Services", "PostalCode", c => c.String());
            AlterColumn("dbo.Services", "City", c => c.String());
            AlterColumn("dbo.Services", "Street", c => c.String());
            AlterColumn("dbo.Services", "Title", c => c.String());
            AlterColumn("dbo.Sales", "Website", c => c.String());
            AlterColumn("dbo.Sales", "Email", c => c.String());
            AlterColumn("dbo.Sales", "Phone", c => c.String());
            AlterColumn("dbo.Sales", "Longitude", c => c.String());
            AlterColumn("dbo.Sales", "Latitude", c => c.String());
            AlterColumn("dbo.Sales", "Country", c => c.String());
            AlterColumn("dbo.Sales", "Region", c => c.String());
            AlterColumn("dbo.Sales", "PostalCode", c => c.String());
            AlterColumn("dbo.Sales", "City", c => c.String());
            AlterColumn("dbo.Sales", "Street", c => c.String());
            AlterColumn("dbo.Sales", "Title", c => c.String());
            AlterColumn("dbo.ProductImages", "ImageCropUrl", c => c.String());
            AlterColumn("dbo.ProductImages", "ImageUrl", c => c.String());
            AlterColumn("dbo.Collections", "ImageCropUrl", c => c.String());
            AlterColumn("dbo.Collections", "ImageUrl", c => c.String());
            AlterColumn("dbo.Collections", "Title", c => c.String());
            AlterColumn("dbo.Products", "DrawingImageUrl", c => c.String());
            AlterColumn("dbo.Products", "Code", c => c.String());
            AlterColumn("dbo.Products", "Title", c => c.String());
            AlterColumn("dbo.Categories", "ImageCropUrl", c => c.String());
            AlterColumn("dbo.Categories", "ImageUrl", c => c.String());
            AlterColumn("dbo.Categories", "Title", c => c.String());
            AlterColumn("dbo.Catalogues", "FileUrl", c => c.String());
            AlterColumn("dbo.Catalogues", "Version", c => c.String());
            AlterColumn("dbo.Catalogues", "Title", c => c.String());
            AlterColumn("dbo.Banners", "ImageCropUrl", c => c.String());
            AlterColumn("dbo.Banners", "ImageUrl", c => c.String());
            AlterColumn("dbo.Banners", "Title", c => c.String());
            AlterColumn("dbo.Attests", "FileUrl", c => c.String());
            AlterColumn("dbo.Attests", "Title", c => c.String());
            CreateIndex("dbo.Collections", "ParentCollectionId");
            AddForeignKey("dbo.Collections", "ParentCollectionId", "dbo.Collections", "Id");
        }
    }
}
