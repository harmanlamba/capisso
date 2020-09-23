﻿// <auto-generated />
using System;
using Capisso.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Capisso.Migrations
{
    [DbContext(typeof(CapissoContext))]
    partial class CapissoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Capisso.Entities.Contact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Notes")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("OrganisationId")
                        .HasColumnType("int");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("OrganisationId");

                    b.ToTable("Contacts");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "nwae@metric.com",
                            Name = "Nwae Emperot",
                            OrganisationId = 1
                        },
                        new
                        {
                            Id = 2,
                            Email = "nwae@metric.com",
                            Name = "Raicg Thurlandes",
                            OrganisationId = 2
                        },
                        new
                        {
                            Id = 3,
                            Name = "Eklly Incoleb",
                            OrganisationId = 2,
                            PhoneNumber = "+64 21 123 456"
                        },
                        new
                        {
                            Id = 4,
                            Email = "nwae@metric.com",
                            Name = "Ibll Tages",
                            OrganisationId = 3,
                            PhoneNumber = "+64 21 123 456"
                        });
                });

            modelBuilder.Entity("Capisso.Entities.Course", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("Courses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Code = "SOFTENG 761",
                            Description = "Learn how to use the agile software methodology.",
                            Name = "Advanced Agile and Lean Software Development"
                        },
                        new
                        {
                            Id = 2,
                            Code = "SOFTENG 762",
                            Description = "Learn how to automate processes robitically.",
                            Name = "Robotic Process Automation"
                        });
                });

            modelBuilder.Entity("Capisso.Entities.Organisation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Classifications")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Organisations");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "39 Hunter St, Sydney NSW 2000, Australia",
                            Classifications = "Trading;C++",
                            Description = "Topiver is a proprietary trading firm and market maker for various exchange-listed financial instruments. Its name derives from the Dutch optie verhandelaar, or \"option trader\".",
                            Name = "Topiver",
                            Status = 0
                        },
                        new
                        {
                            Id = 2,
                            Address = "Fletnix Corporate Headquarters 100 Winchester Circle Los Gatos, CA 95032,",
                            Classifications = "Streaming;Java;JavaScript",
                            Description = "Fletnix, Inc. is an American technology and media services provider and production company headquartered in Los Gatos, California. Fletnix was founded in 1997 by Reed Hastings and Marc Randolph in Scotts Valley, California.",
                            Name = "Fletnix",
                            Status = 0
                        },
                        new
                        {
                            Id = 3,
                            Address = "6/341 George St, Sydney NSW 2000, Australia",
                            Classifications = "Java;React;AWS",
                            Description = "Aslattian Corporation Plc is an Australian software company that develops products for software developers and project managers.",
                            Name = "Aslattian",
                            Status = 1
                        });
                });

            modelBuilder.Entity("Capisso.Entities.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Notes")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("OrganisationId")
                        .HasColumnType("int");

                    b.Property<string>("Outcome")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("OrganisationId");

                    b.ToTable("Projects");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            OrganisationId = 1,
                            StartDate = new DateTime(2020, 3, 1, 7, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = 0,
                            Title = "Organisation and project managment tool"
                        },
                        new
                        {
                            Id = 2,
                            OrganisationId = 2,
                            StartDate = new DateTime(2019, 2, 3, 9, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = 2,
                            Title = "Student enrolment tool"
                        },
                        new
                        {
                            Id = 3,
                            OrganisationId = 2,
                            StartDate = new DateTime(2020, 1, 2, 9, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = 1,
                            Title = "Fletnix app runs on calculator"
                        },
                        new
                        {
                            Id = 4,
                            OrganisationId = 3,
                            StartDate = new DateTime(2020, 5, 8, 8, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = 3,
                            Title = "Speed up Jira"
                        });
                });

            modelBuilder.Entity("Capisso.Entities.ProjectCourse", b =>
                {
                    b.Property<int>("ProjectId")
                        .HasColumnType("int");

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.HasKey("ProjectId", "CourseId");

                    b.HasIndex("CourseId");

                    b.ToTable("ProjectCourse");

                    b.HasData(
                        new
                        {
                            ProjectId = 1,
                            CourseId = 1
                        },
                        new
                        {
                            ProjectId = 1,
                            CourseId = 2
                        },
                        new
                        {
                            ProjectId = 2,
                            CourseId = 1
                        },
                        new
                        {
                            ProjectId = 3,
                            CourseId = 2
                        },
                        new
                        {
                            ProjectId = 4,
                            CourseId = 1
                        });
                });

            modelBuilder.Entity("Capisso.Entities.Contact", b =>
                {
                    b.HasOne("Capisso.Entities.Organisation", "Organisation")
                        .WithMany("Contacts")
                        .HasForeignKey("OrganisationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Capisso.Entities.Project", b =>
                {
                    b.HasOne("Capisso.Entities.Organisation", "Organisation")
                        .WithMany("Projects")
                        .HasForeignKey("OrganisationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Capisso.Entities.ProjectCourse", b =>
                {
                    b.HasOne("Capisso.Entities.Course", "Course")
                        .WithMany("ProjectCourses")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Capisso.Entities.Project", "Project")
                        .WithMany("ProjectCourses")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
