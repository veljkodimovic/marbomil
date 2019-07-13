namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Product_OrderNumber_Nullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Products", "OrderNumber", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Products", "OrderNumber", c => c.Int(nullable: false));
        }
    }
}
