using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieAPI.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new MovieAPIContext(
                serviceProvider.GetRequiredService<DbContextOptions<MovieAPIContext>>()))
            {
                // Look for any movies.
                if (context.MovieItem.Count() > 0)
                {
                    return;   // DB has been seeded
                }

                ReviewItem seedreview = new ReviewItem
                {
                    Name = "Bryan",
                    Review = "Best movie I have ever seen",
                    Uploaded = "07-10-18 4:20T18:25:43.511Z",
                    Rating = 5
                };
                List<ReviewItem> reviewItem = new List<ReviewItem>
                {
                    seedreview,seedreview
                };
                context.MovieItem.AddRange(

                    new MovieItem
                    {
                        Title = "Mulan",
                        Genre = "Fanatsy",
                        Rating = 5,
                        Description = "Mulan is based on the Chinese legend of Hua Mulan. The film's plot takes place in China during the Han dynasty, where Fa Mulan, daughter of aged warrior Fa Zhou, impersonates a man to take her father's place during a general conscription to counter a Hun invasion.",
                        Director = "Tony Bancroft",
                        Url = "https://en.wikipedia.org/wiki/Mulan_(1998_film)#/media/File:Movie_poster_mulan.JPG",
                        Reviews = reviewItem,
                        Width = "768",
                        Height = "432",
                        Uploaded = "07-10-18 4:20T18:25:43.511Z"
                    }


                );
                context.SaveChanges();
            }
        }
    }
}

