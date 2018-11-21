using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieAPI.Models;

namespace MovieAPI.Models
{
    public class MovieAPIContext : DbContext
    {
        public MovieAPIContext(DbContextOptions<MovieAPIContext> options)
            : base(options)
        {
        }

        public DbSet<MovieAPI.Models.MovieItem> MovieItem { get; set; }

        public DbSet<MovieAPI.Models.ReviewItem> ReviewItem { get; set; }
    }
}