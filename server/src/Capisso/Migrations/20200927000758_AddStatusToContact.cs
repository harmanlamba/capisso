using Microsoft.EntityFrameworkCore.Migrations;

namespace Capisso.Migrations
{
    public partial class AddStatusToContact : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Contacts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                 name: "Status",
                table: "Contacts");
        }
    }
}
