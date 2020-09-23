using Microsoft.EntityFrameworkCore.Migrations;

namespace Capisso.Migrations
{
    public partial class RemoveContactNotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Contacts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Contacts",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);
        }
    }
}
