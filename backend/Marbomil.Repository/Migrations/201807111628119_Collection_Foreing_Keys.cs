namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Collection_Foreing_Keys : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Collections", "ParentCollectionId");
            CreateIndex("dbo.Collections", "CategoryId");
            AddForeignKey("dbo.Collections", "CategoryId", "dbo.Categories", "Id");
            AddForeignKey("dbo.Collections", "ParentCollectionId", "dbo.Collections", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Collections", "ParentCollectionId", "dbo.Collections");
            DropForeignKey("dbo.Collections", "CategoryId", "dbo.Categories");
            DropIndex("dbo.Collections", new[] { "CategoryId" });
            DropIndex("dbo.Collections", new[] { "ParentCollectionId" });
        }
    }
}
