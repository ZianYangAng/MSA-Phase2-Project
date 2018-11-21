using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MovieBankAPI.Models
{
public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new MovieBankAPIContext(
                serviceProvider.GetRequiredService<DbContextOptions<MovieBankAPIContext>>()))
            {
                // Look for any movies.
                if (context.MovieItem.Count() > 0)
                {
                    return;   // DB has been seeded
                }

                context.MovieItem.AddRange(
                    new MovieItem
                    {
                        Title = "Mulan",
                        Genre = "Fanatsy",
                        Rating = 5,
                        Description = "Mulan is based on the Chinese legend of Hua Mulan. The film's plot takes place in China during the Han dynasty, where Fa Mulan, daughter of aged warrior Fa Zhou, impersonates a man to take her father's place during a general conscription to counter a Hun invasion.",
                        Director = "Tony Bancroft",
                        Url = "https://movieimagesblob.blob.core.windows.net/images/809ff44a-9da5-4466-b436-ed9165c88fc7.jpg",
                        Uploaded = DateTime.Now.ToString(),
                        UID = "462779117582540",
                        Reviews = new List<ReviewItem> { new ReviewItem
                        {
                            Name = "Bryan Ang",
                            Review = "Best movie I have ever seen, I cried",
                            Uploaded = DateTime.Now.ToString(),
                            Rating = 5,
                            UID = "462779117582540"
                        } }
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
