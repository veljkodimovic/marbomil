namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Product_CollectionId_Nullable : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Products", new[] { "CollectionId" });
            AlterColumn("dbo.Products", "CollectionId", c => c.Int());
            CreateIndex("dbo.Products", "CollectionId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Products", new[] { "CollectionId" });
            AlterColumn("dbo.Products", "CollectionId", c => c.Int(nullable: false));
            CreateIndex("dbo.Products", "CollectionId");
        }
    }
}
