using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieBankAPI.Models
{
    public class MovieItemImage
    {
        public string Title { get; set; }
        public string Genre { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }
        public string Director { get; set; }
        public string UID { get; set; }
        public IFormFile Image { get; set; }
    }
}
