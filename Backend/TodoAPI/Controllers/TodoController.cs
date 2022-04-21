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
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public TodoController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoReadDTO>>> GetTodos()
        {
            var todos = await _context.Todos.Include(t=>t.Status).Include(t=>t.Flag).ToListAsync();
            var todosDtos = new List<TodoReadDTO>();
            _mapper.Map(todos, todosDtos);
            return todosDtos;
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoReadDTO>> GetTodo(int id)
        {
            var todo = await _context.Todos.Include(t=>t.Status).Include(t=>t.Flag).SingleOrDefaultAsync(t=>t.Id==id);

            if (todo == null)
            {
                return NotFound();
            }

            var todoDto = new TodoReadDTO();
            _mapper.Map(todo, todoDto);

            return todoDto;
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(int id, TodoWriteDTO todoDto)
        {
            var todo = await _context.Todos.FindAsync(id);
            _mapper.Map(todoDto, todo);
            _context.Entry(todo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
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

        // POST: api/Todo
        [HttpPost]
        public async Task<ActionResult<TodoReadDTO>> PostTodo(TodoWriteDTO todoDto)
        {
            var todo = new Todo();
            _mapper.Map(todoDto,todo);
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            todo= await _context.Todos.Include(t=>t.Flag).Include(t=>t.Status).SingleOrDefaultAsync(t=>t.Id==todo.Id);

            var todoReadDto = new TodoReadDTO();
            _mapper.Map(todo, todoReadDto);

            return CreatedAtAction("GetTodo", new { id = todo.Id }, todoReadDto);
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoExists(int id)
        {
            return _context.Todos.Any(e => e.Id == id);
        }
    }
}
