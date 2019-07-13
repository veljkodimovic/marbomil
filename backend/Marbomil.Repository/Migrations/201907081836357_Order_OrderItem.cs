namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Order_OrderItem : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.OrderItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderId = c.Int(),
                        ProductId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Orders", t => t.OrderId)
                .ForeignKey("dbo.Products", t => t.ProductId)
                .Index(t => t.OrderId)
                .Index(t => t.ProductId);
            
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BuyerId = c.Int(),
                        Date = c.DateTime(nullable: false),
                        Note = c.String(),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.BuyerId)
                .Index(t => t.BuyerId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.OrderItems", "ProductId", "dbo.Products");
            DropForeignKey("dbo.OrderItems", "OrderId", "dbo.Orders");
            DropForeignKey("dbo.Orders", "BuyerId", "dbo.AspNetUsers");
            DropIndex("dbo.Orders", new[] { "BuyerId" });
            DropIndex("dbo.OrderItems", new[] { "ProductId" });
            DropIndex("dbo.OrderItems", new[] { "OrderId" });
            DropTable("dbo.Orders");
            DropTable("dbo.OrderItems");
        }
    }
}
