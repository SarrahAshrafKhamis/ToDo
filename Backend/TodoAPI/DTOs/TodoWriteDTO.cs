namespace TodoAPI.DTOs
{
    public class TodoWriteDTO
    {
        public string Title { get; set; }
        public int StatusId { get; set; }
        public string? Comments { get; set; }
        public int? FlagId { get; set; }
    }
}
