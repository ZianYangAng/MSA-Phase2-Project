using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieBank.Models
{
    public class ReviewItem
    {
        [Key]
        public int Id { get; set; }

        public int RevRefID { get; set; }
        public string Name { get; set; }
        public string Review { get; set; }
        public string Uploaded { get; set; }
        public int Rating { get; set; }
        public string UID { get; set; }
    }
}
