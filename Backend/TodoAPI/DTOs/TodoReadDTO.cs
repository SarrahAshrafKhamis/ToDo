namespace TodoAPI.DTOs
{
    public class TodoReadDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Status Status { get; set; }
        public string? Comments { get; set; }
        public Flag? Flag { get; set; }
    }
}