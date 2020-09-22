using Capisso.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Configurations
{
    public class ContactConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name).IsRequired();
            builder.Property(e => e.PhoneNumber);
            builder.Property(e => e.Email);
            builder.Property(e => e.Notes);
            builder
                .HasOne(e => e.Organisation)
                .WithMany(e => e.Contacts)
                .HasForeignKey(e => e.OrganisationId);
            builder.HasData(
                new Contact
                {
                    Id = 1,
                    Name = "Nwae Emperot",
                    Email = "nwae@metric.com",
                    OrganisationId = 1,
                },
                new Contact
                {
                    Id = 2,
                    Name = "Raicg Thurlandes",
                    Email = "nwae@metric.com",
                    OrganisationId = 2,
                },
                new Contact
                {
                    Id = 3,
                    Name = "Eklly Incoleb",
                    PhoneNumber = "+64 21 123 456",
                    OrganisationId = 2,
                },
                new Contact
                {
                    Id = 4,
                    Name = "Ibll Tages",
                    Email = "nwae@metric.com",
                    PhoneNumber = "+64 21 123 456",
                    OrganisationId = 3,
                }
            );
        }
    }
}
