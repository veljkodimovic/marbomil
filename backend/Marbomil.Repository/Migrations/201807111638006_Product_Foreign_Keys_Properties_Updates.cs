namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Product_Foreign_Keys_Properties_Updates : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ProductImages", "ProductId", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "DrawingImageUrl", c => c.String());
            CreateIndex("dbo.Products", "CollectionId");
            CreateIndex("dbo.Products", "CategoryId");
            CreateIndex("dbo.ProductImages", "ProductId");
            AddForeignKey("dbo.Products", "CategoryId", "dbo.Categories", "Id");
            AddForeignKey("dbo.Products", "CollectionId", "dbo.Collections", "Id");
            AddForeignKey("dbo.ProductImages", "ProductId", "dbo.Products", "Id");
            DropColumn("dbo.ProductImages", "IsNew");
            DropColumn("dbo.ProductImages", "IsDirty");
            DropColumn("dbo.ProductImages", "IsDeleted");
            DropColumn("dbo.Products", "DrawingImage");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Products", "DrawingImage", c => c.String());
            AddColumn("dbo.ProductImages", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.ProductImages", "IsDirty", c => c.Boolean(nullable: false));
            AddColumn("dbo.ProductImages", "IsNew", c => c.Boolean(nullable: false));
            DropForeignKey("dbo.ProductImages", "ProductId", "dbo.Products");
            DropForeignKey("dbo.Products", "CollectionId", "dbo.Collections");
            DropForeignKey("dbo.Products", "CategoryId", "dbo.Categories");
            DropIndex("dbo.ProductImages", new[] { "ProductId" });
            DropIndex("dbo.Products", new[] { "CategoryId" });
            DropIndex("dbo.Products", new[] { "CollectionId" });
            DropColumn("dbo.Products", "DrawingImageUrl");
            DropColumn("dbo.ProductImages", "ProductId");
        }
    }
}
