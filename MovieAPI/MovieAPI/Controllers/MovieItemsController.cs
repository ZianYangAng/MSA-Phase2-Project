using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieAPI.Models;

namespace MovieAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieItemsController : ControllerBase
    {
        private readonly MovieAPIContext _context;

        public MovieItemsController(MovieAPIContext context)
        {
            _context = context;
        }

        // GET: api/MovieItems
        [HttpGet]
        public IEnumerable<MovieItem> GetMovieItem()
        {
            return _context.MovieItem
                .Include(b => b.Reviews);
        }

        // GET: api/MovieItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movieItem = await _context.MovieItem.FindAsync(id);

            if (movieItem == null)
            {
                return NotFound();
            }

            var newMovieItem =  _context.MovieItem.Include(b => b.Reviews);

            return Ok(newMovieItem);
        }

        // PUT: api/MovieItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieItem([FromRoute] int id, [FromBody] MovieItem movieItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movieItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(movieItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieItemExists(id))
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

        // POST: api/MovieItems
        [HttpPost]
        public async Task<IActionResult> PostMovieItem([FromBody] MovieItem movieItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MovieItem.Add(movieItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovieItem", new { id = movieItem.Id }, movieItem);
        }

        // DELETE: api/MovieItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movieItem = await _context.MovieItem.FindAsync(id);
            if (movieItem == null)
            {
                return NotFound();
            }

            _context.MovieItem.Remove(movieItem);
            await _context.SaveChangesAsync();

            return Ok(movieItem);
        }

        private bool MovieItemExists(int id)
        {
            return _context.MovieItem.Any(e => e.Id == id);
        }

        // GET: api/Meme/Title
        [Route("title")]
        [HttpGet]
        public async Task<List<string>> GetTitle()
        {
            var movies = (from m in _context.MovieItem.Include(b => b.Reviews)
                         select m.Title).Distinct();

            var returned = await movies.ToListAsync();

            return returned;
        }
    }
}