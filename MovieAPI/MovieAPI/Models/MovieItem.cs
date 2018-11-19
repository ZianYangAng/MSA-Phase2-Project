using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieAPI.Models
{
    public class MovieItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }
        public string Director { get; set; }
        public string Url { get; set; }
        public List<ReviewItem> Reviews { get; set; }
        public string Width { get; set; }
        public string Height { get; set; }
        public string Uploaded { get; set; }
    }
}
