using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieAPI.Models
{
    public class MovieImageItem
    {
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public string Director { get; set; }
        public IFormFile Image { get; set; }
    }
}
