using Microsoft.EntityFrameworkCore.Migrations;

namespace Capisso.Migrations
{
    public partial class OrganisationStatusEnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
    UPDATE Organisations
    SET Status =
        CASE Status
            WHEN 'Active' THEN 0
            WHEN 'Inactive' THEN 1
            ELSE 0
        END
    ");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Organisations",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext CHARACTER SET utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Organisations",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.Sql(@"
    UPDATE Organisations
    SET Status =
        CASE Status
            WHEN 0 THEN 'Active'
            WHEN 1 THEN 'Inactive'
            ELSE 'Active'
        END
    ");


        }
    }
}