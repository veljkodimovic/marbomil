namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Product_OrderNumber : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Products", "OrderNumber", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Products", "OrderNumber");
        }
    }
}
