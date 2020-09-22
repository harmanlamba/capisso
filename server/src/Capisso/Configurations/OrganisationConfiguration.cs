using System;
using System.Collections.Generic;
using System.Linq;
using Capisso.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

public class OrganisationConfiguration : IEntityTypeConfiguration<Organisation>
{
    public void Configure(EntityTypeBuilder<Organisation> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).IsRequired();
        builder.Property(e => e.Description).IsRequired();

        var splitStringConverter = new ValueConverter<List<string>, string>(v => string.Join(";", v),
            v => string.IsNullOrEmpty(v) ? new List<string>() : v.Split(new[] { ';' }).ToList());
        var valueComparer = new ValueComparer<List<string>>(
            (c1, c2) => c1.SequenceEqual(c2),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
            c => c.ToList());

        builder
            .Property(e => e.Classifications)
            .IsRequired()
            .HasConversion(splitStringConverter)
            .Metadata
            .SetValueComparer(valueComparer);

        builder.Property(e => e.Address).IsRequired();
        builder.Property(e => e.Status).IsRequired();

        builder.HasData(
            new Organisation
            {
                Id = 1,
                Name = "Topiver",
                Classifications = new List<string> { "Trading", "C++" },
                Address = "39 Hunter St, Sydney NSW 2000, Australia",
                Status = "Active",
                Description = "Topiver is a proprietary trading firm and market maker for various exchange-listed financial instruments. Its name derives from the Dutch optie verhandelaar, or \"option trader\"."
            },
            new Organisation
            {
                Id = 2,
                Name = "Fletnix",
                Classifications = new List<string> { "Streaming", "Java", "JavaScript" },
                Address = "Fletnix Corporate Headquarters 100 Winchester Circle Los Gatos, CA 95032,",
                Status = "Active",
                Description = "Fletnix, Inc. is an American technology and media services provider and production company headquartered in Los Gatos, California. Fletnix was founded in 1997 by Reed Hastings and Marc Randolph in Scotts Valley, California."
            },
            new Organisation
            {
                Id = 3,
                Name = "Aslattian",
                Classifications = new List<string> { "Java", "React", "AWS" },
                Address = "6/341 George St, Sydney NSW 2000, Australia",
                Status = "Inactive",
                Description = "Aslattian Corporation Plc is an Australian software company that develops products for software developers and project managers."
            }
        );
    }
}