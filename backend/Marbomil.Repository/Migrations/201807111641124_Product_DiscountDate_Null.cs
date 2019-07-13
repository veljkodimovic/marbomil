namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Product_DiscountDate_Null : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Products", "DiscountDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Products", "DiscountDate", c => c.DateTime(nullable: false));
        }
    }
}
