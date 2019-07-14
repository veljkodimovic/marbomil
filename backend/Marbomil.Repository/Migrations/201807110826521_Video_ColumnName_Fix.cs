namespace Marbomil.Repository.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Video_ColumnName_Fix : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Videos", "ImageCropUrl", c => c.String());
            DropColumn("dbo.Videos", "ImagerCropUrl");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Videos", "ImagerCropUrl", c => c.String());
            DropColumn("dbo.Videos", "ImageCropUrl");
        }
    }
}
