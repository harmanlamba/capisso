﻿using System;
using Capisso.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Capisso.Configurations
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Title).IsRequired();
            builder.Property(e => e.Notes);
            builder.Property(e => e.Outcome);
            builder.Property(e => e.StartDate).IsRequired();
            builder.Property(e => e.EndDate);
            builder.Property(e => e.Status).IsRequired();
            builder
                .HasOne(e => e.Organisation)
                .WithMany(e => e.Projects)
                .HasForeignKey(e => e.OrganisationId);
            builder
                .HasOne(e => e.Contact)
                .WithMany(e => e.Projects)
                .HasForeignKey(e => e.ContactId);
            builder.HasData(
                new Project
                {
                    Id = 1,
                    Title = "Organisation and project managment tool",
                    StartDate = new DateTime(2020, 3, 1, 7, 0, 0),
                    OrganisationId = 1,
                    Status = ProjectStatus.Pending,
                    ContactId = 1
                },
                new Project
                {
                    Id = 2,
                    Title = "Student enrolment tool",
                    StartDate = new DateTime(2019, 2, 3, 9, 0, 0),
                    OrganisationId = 2,
                    Status = ProjectStatus.CompletedSuccessfully,
                    ContactId = 2
                },
                new Project
                {
                    Id = 3,
                    Title = "Fletnix app runs on calculator",
                    StartDate = new DateTime(2020, 1, 2, 9, 0, 0),
                    OrganisationId = 2,
                    Status = ProjectStatus.InProgress,
                    ContactId = 3
                },
                new Project
                {
                    Id = 4,
                    Title = "Speed up Jira",
                    StartDate = new DateTime(2020, 5, 8, 8, 0, 0),
                    OrganisationId = 3,
                    Status = ProjectStatus.CompletedWithIssues
                }
            );
        }
    }
}