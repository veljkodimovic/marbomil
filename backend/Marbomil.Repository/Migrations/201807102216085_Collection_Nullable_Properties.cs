namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Collection_Nullable_Properties : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Collections", "ParentCollectionId", c => c.Int());
            AlterColumn("dbo.Collections", "CategoryId", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Collections", "CategoryId", c => c.Int(nullable: false));
            AlterColumn("dbo.Collections", "ParentCollectionId", c => c.Int(nullable: false));
        }
    }
}
