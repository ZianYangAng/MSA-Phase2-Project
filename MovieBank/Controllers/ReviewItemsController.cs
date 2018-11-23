using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieBank.Models;

namespace MovieBank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewItemsController : ControllerBase
    {
        private readonly MovieBankContext _context;

        public ReviewItemsController(MovieBankContext context)
        {
            _context = context;
        }

        // GET: api/ReviewItems
        [HttpGet]
        public IEnumerable<ReviewItem> GetReviewItem()
        {
            return _context.ReviewItem;
        }

        // GET: api/ReviewItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReviewItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var reviewItem = await _context.ReviewItem.FindAsync(id);

            if (reviewItem == null)
            {
                return NotFound();
            }

            return Ok(reviewItem);
        }

        // PUT: api/ReviewItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReviewItem([FromRoute] int id, [FromBody] ReviewItem reviewItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reviewItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(reviewItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ReviewItems
        [HttpPost]
        public async Task<IActionResult> PostReviewItem([FromBody] ReviewItem reviewItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ReviewItem.Add(reviewItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReviewItem", new { id = reviewItem.Id }, reviewItem);
        }

        // DELETE: api/ReviewItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReviewItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var reviewItem = await _context.ReviewItem.FindAsync(id);
            if (reviewItem == null)
            {
                return NotFound();
            }

            _context.ReviewItem.Remove(reviewItem);
            await _context.SaveChangesAsync();

            return Ok(reviewItem);
        }

        [HttpGet]
        [Route("revID")]
        public async Task<List<ReviewItem>> GetTitleItem([FromQuery] int revID)
        {
            var reviews = from r in _context.ReviewItem
                          where r.RevRefID == revID
                          select r; //get all the movies


            var returned = await reviews.ToListAsync(); //return the movies

            return returned;
        }

        [HttpPost, Route("upload")]
        public async Task<IActionResult> UploadReview([FromForm] string review, [FromForm] int refID, [FromForm] string name, [FromForm] string uID, [FromForm] int rating)
        {
            ReviewItem reviewItem = new ReviewItem();
            reviewItem.RevRefID = refID;
            reviewItem.Name = name;
            reviewItem.Review = review;
            reviewItem.Uploaded = DateTime.Now.ToString();
            reviewItem.Rating = rating;
            reviewItem.UID = uID;

            _context.ReviewItem.Add(reviewItem);
            await _context.SaveChangesAsync();

            return Ok($"review uploaded");
        }
        private bool ReviewItemExists(int id)
        {
            return _context.ReviewItem.Any(e => e.Id == id);
        }
    }
}