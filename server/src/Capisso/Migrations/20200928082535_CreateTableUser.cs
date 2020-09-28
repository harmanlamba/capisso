using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capisso.Migrations
{
    public partial class CreateTableUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(nullable: false),
                    UserRole = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "UserRole" },
                values: new object[,]
                {
                    { 1, "hlam132@aucklanduni.ac.nz", 1 },
                    { 2, "eleu033@aucklanduni.ac.nz", 1 },
                    { 3, "hlea849@aucklanduni.ac.nz", 1 },
                    { 4, "jgan963@aucklanduni.ac.nz", 1 },
                    { 5, "jrob928@aucklanduni.ac.nz", 1 },
                    { 6, "jsim862@aucklanduni.ac.nz", 1 },
                    { 7, "nnan773@aucklanduni.ac.nz", 1 },
                    { 8, "ssan631@aucklanduni.ac.nz", 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
