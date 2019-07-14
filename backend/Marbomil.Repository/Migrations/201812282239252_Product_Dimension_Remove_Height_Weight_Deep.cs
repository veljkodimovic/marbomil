namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Product_Dimension_Remove_Height_Weight_Deep : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Products", "Dimension", c => c.String(maxLength: 50));

            // Updating "Dimension" column
            Sql("UPDATE [dbo].[Products] " +
                "SET [Dimension] = CONCAT([Width], 'X', [Height], 'X', [Depth])");

            DropColumn("dbo.Products", "Width");
            DropColumn("dbo.Products", "Height");
            DropColumn("dbo.Products", "Depth");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Products", "Depth", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "Height", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Products", "Width", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("dbo.Products", "Dimension");
        }
    }
}
