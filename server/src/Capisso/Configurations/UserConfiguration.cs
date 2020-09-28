using Capisso.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(e => e.Email);
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Email).IsRequired();
            builder.Property(e => e.UserRole).IsRequired();

            builder.HasData(
                new User
                {
                    Id = 1,
                    Email = "hlam132@aucklanduni.ac.nz",
                    UserRole = UserRole.Admin
                },
                new User
                {
                    Id = 2,
                    Email = "eleu033@aucklanduni.ac.nz",
                    UserRole = UserRole.Admin
                },
                new User
                {
                    Id = 3,
                    Email = "hlea849@aucklanduni.ac.nz",
                    UserRole = UserRole.Admin
                },
                new User
                {
                    Id = 4,
                    Email = "jgan963@aucklanduni.ac.nz",
                    UserRole = UserRole.Admin
                },
                new User
                {
                    Id = 5,
                    Email = "jrob928@aucklanduni.ac.nz",
                    UserRole = UserRole.Admin
                },
                new User
                {
                    Id = 6,
                    Email = "jsim862@aucklanduni.ac.nz",
                    UserRole = UserRole.Admin
                },
                new User
                {
                    Id = 7,
                    Email = "nnan773@aucklanduni.ac.nz",
                    UserRole = UserRole.Admin
                },
                new User
                {
                    Id = 8,
                    Email = "ssan631@aucklanduni.ac.nz",
                    UserRole = UserRole.Admin
                }
                );
        }
    }
}
