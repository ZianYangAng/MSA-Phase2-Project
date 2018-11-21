using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieBankAPI.Models;

namespace MovieBankAPI.Models
{
    public class MovieBankAPIContext : DbContext
    {
        public MovieBankAPIContext (DbContextOptions<MovieBankAPIContext> options)
            : base(options)
        {
        }

        public DbSet<MovieBankAPI.Models.MovieItem> MovieItem { get; set; }

        public DbSet<MovieBankAPI.Models.ReviewItem> ReviewItem { get; set; }
    }
}
