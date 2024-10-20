using Jewelry_Acution_Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Jewelry_Acution_Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options)
        {
        }
        //methna thama entity gahnne
        public DbSet<Signup> Signups { get; set; }

    }
}
