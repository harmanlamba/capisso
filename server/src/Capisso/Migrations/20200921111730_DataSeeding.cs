using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capisso.Migrations
{
    public partial class DataSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "Id", "Code", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "SOFTENG 761", "Learn how to use the agile software methodology.", "Advanced Agile and Lean Software Development" },
                    { 2, "SOFTENG 762", "Learn how to automate processes robitically.", "Robotic Process Automation" }
                });

            migrationBuilder.InsertData(
                table: "Organisations",
                columns: new[] { "Id", "Address", "Classifications", "Description", "Name", "Status" },
                values: new object[,]
                {
                    { 1, "39 Hunter St, Sydney NSW 2000, Australia", "Trading;C++", "Topiver is a proprietary trading firm and market maker for various exchange-listed financial instruments. Its name derives from the Dutch optie verhandelaar, or \"option trader\".", "Topiver", "Active" },
                    { 2, "Fletnix Corporate Headquarters 100 Winchester Circle Los Gatos, CA 95032,", "Streaming;Java;JavaScript", "Fletnix, Inc. is an American technology and media services provider and production company headquartered in Los Gatos, California. Fletnix was founded in 1997 by Reed Hastings and Marc Randolph in Scotts Valley, California.", "Fletnix", "Active" },
                    { 3, "6/341 George St, Sydney NSW 2000, Australia", "Java;React;AWS", "Aslattian Corporation Plc is an Australian software company that develops products for software developers and project managers.", "Aslattian", "Inactive" }
                });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "EndDate", "Notes", "OrganisationId", "Outcome", "StartDate", "Title" },
                values: new object[,]
                {
                    { 1, null, null, 1, null, new DateTime(2020, 3, 1, 7, 0, 0, 0, DateTimeKind.Unspecified), "Organisation and project managment tool" },
                    { 2, null, null, 2, null, new DateTime(2019, 2, 3, 9, 0, 0, 0, DateTimeKind.Unspecified), "Student enrolment tool" },
                    { 3, null, null, 2, null, new DateTime(2020, 1, 2, 9, 0, 0, 0, DateTimeKind.Unspecified), "Fletnix app runs on calculator" },
                    { 4, null, null, 3, null, new DateTime(2020, 5, 8, 8, 0, 0, 0, DateTimeKind.Unspecified), "Speed up Jira" }
                });

            migrationBuilder.InsertData(
                table: "ProjectCourse",
                columns: new[] { "ProjectId", "CourseId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 2, 1 },
                    { 3, 2 },
                    { 4, 1 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProjectCourse",
                keyColumns: new[] { "ProjectId", "CourseId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "ProjectCourse",
                keyColumns: new[] { "ProjectId", "CourseId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "ProjectCourse",
                keyColumns: new[] { "ProjectId", "CourseId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "ProjectCourse",
                keyColumns: new[] { "ProjectId", "CourseId" },
                keyValues: new object[] { 3, 2 });

            migrationBuilder.DeleteData(
                table: "ProjectCourse",
                keyColumns: new[] { "ProjectId", "CourseId" },
                keyValues: new object[] { 4, 1 });

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Organisations",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
