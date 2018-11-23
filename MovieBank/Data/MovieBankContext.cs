using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieBank.Models;

namespace MovieBank.Models
{
    public class MovieBankContext : DbContext
    {
        public MovieBankContext (DbContextOptions<MovieBankContext> options)
            : base(options)
        {
        }

        public DbSet<MovieBank.Models.MovieItem> MovieItem { get; set; }

        public DbSet<MovieBank.Models.ReviewItem> ReviewItem { get; set; }
    }
}
