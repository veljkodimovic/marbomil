namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Buyer_User_Properties : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "CompanyName", c => c.String(maxLength: 100));
            AddColumn("dbo.AspNetUsers", "Address", c => c.String(maxLength: 100));
            AddColumn("dbo.AspNetUsers", "CompanyTaxIdentificationNumber", c => c.String(maxLength: 100));
            AddColumn("dbo.AspNetUsers", "CompanyRegistrationNumber", c => c.String(maxLength: 100));
            AddColumn("dbo.AspNetUsers", "AccountNumber", c => c.String(maxLength: 100));
            AddColumn("dbo.AspNetUsers", "ContactPerson", c => c.String(maxLength: 100));
            AddColumn("dbo.AspNetUsers", "ContactPhoneNumber", c => c.String(maxLength: 100));
            AddColumn("dbo.AspNetUsers", "Website", c => c.String(maxLength: 100));
            AddColumn("dbo.AspNetUsers", "Discount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Discount");
            DropColumn("dbo.AspNetUsers", "Website");
            DropColumn("dbo.AspNetUsers", "ContactPhoneNumber");
            DropColumn("dbo.AspNetUsers", "ContactPerson");
            DropColumn("dbo.AspNetUsers", "AccountNumber");
            DropColumn("dbo.AspNetUsers", "CompanyRegistrationNumber");
            DropColumn("dbo.AspNetUsers", "CompanyTaxIdentificationNumber");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "CompanyName");
            DropColumn("dbo.AspNetUsers", "IsActive");
        }
    }
}
