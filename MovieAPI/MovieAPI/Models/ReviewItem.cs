using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieAPI.Models
{
    public class ReviewItem
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Review { get; set; }
        public string Uploaded { get; set; }
        public double Rating { get; set; }
    }
}
