#nullable disable
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Data;
using TodoAPI.DTOs;

namespace TodoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlagController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public FlagController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Flag
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flag>>> GetFlags()
        {
            return await _context.Flags.ToListAsync();
        }

        // GET: api/Flag/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Flag>> GetFlag(int id)
        {
            var flag = await _context.Flags.FindAsync(id);

            if (flag == null)
            {
                return NotFound();
            }

            return flag;
        }

        // PUT: api/Flag/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlag(int id, FlagWriteDTO flagDto)
        {
            var flag = await _context.Flags.FindAsync(id);
            _mapper.Map(flagDto, flag);
            _context.Entry(flag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlagExists(id))
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

        // POST: api/Flag
        [HttpPost]
        public async Task<ActionResult<Flag>> PostFlag(FlagWriteDTO flagDto)
        {
            var flag = new Flag();
            _mapper.Map(flagDto, flag);
            _context.Flags.Add(flag);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlag", new { id = flag.Id }, flag);
        }

        // DELETE: api/Flag/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlag(int id)
        {
            var flag = await _context.Flags.FindAsync(id);
            if (flag == null)
            {
                return NotFound();
            }

            _context.Flags.Remove(flag);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FlagExists(int id)
        {
            return _context.Flags.Any(e => e.Id == id);
        }
    }
}
