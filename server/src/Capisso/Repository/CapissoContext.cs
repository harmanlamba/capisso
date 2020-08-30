﻿using Capisso.Entities;
using Microsoft.EntityFrameworkCore;
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
            Database.EnsureCreated();
        }

        public DbSet<Organisation> Organisations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Organisation>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Description).IsRequired();

                var splitStringConverter = new ValueConverter<List<string>, string>(v => string.Join(";", v), v => v.Split(new[] { ';' }).ToList());
                var valueComparer = new ValueComparer<List<string>>(
                    (c1, c2) => c1.SequenceEqual(c2),
                    c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                    c => c.ToList());

                entity.Property(e => e.Classifications).IsRequired().HasConversion(splitStringConverter).Metadata.SetValueComparer(valueComparer);

                entity.Property(e => e.Address).IsRequired();
                entity.Property(e => e.Status).IsRequired();
            });
        }
    }
}