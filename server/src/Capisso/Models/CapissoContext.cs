using Microsoft.EntityFrameworkCore;

namespace Capisso.Models
{
    public sealed class CapissoContext : DbContext
    {
        public CapissoContext(DbContextOptions<CapissoContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Celebrity> Celebrity { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Celebrity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Address).IsRequired();
            });
        }
    }
}