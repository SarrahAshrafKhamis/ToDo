using Microsoft.EntityFrameworkCore;

namespace TodoAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Flag> Flags { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Todo> Todos { get; set; }
    }
}
