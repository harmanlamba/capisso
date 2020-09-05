using Capisso.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Capisso.Repository
{
    public sealed class CapissoContext : DbContext
    {
        public CapissoContext(DbContextOptions<CapissoContext> options)
            : base(options)
        {

        }

        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Organisation>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Description).IsRequired();

                var splitStringConverter = new ValueConverter<List<string>, string>(v => string.Join(";", v), v => string.IsNullOrEmpty(v) ? new List<string>() : v.Split(new[] { ';' }).ToList());
                var valueComparer = new ValueComparer<List<string>>(
                    (c1, c2) => c1.SequenceEqual(c2),
                    c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                    c => c.ToList());

                entity.Property(e => e.Classifications).IsRequired().HasConversion(splitStringConverter).Metadata.SetValueComparer(valueComparer);

                entity.Property(e => e.Address).IsRequired();
                entity.Property(e => e.Status).IsRequired();
            });

            modelBuilder.Entity<Course>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Code).IsRequired();
                entity.Property(e => e.Description).IsRequired();
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired();
                entity.Property(e => e.Notes);
                entity.Property(e => e.Outcome);
                entity.Property(e => e.StartDate).IsRequired();
                entity.Property(e => e.EndDate);
            });
        }
    }
}