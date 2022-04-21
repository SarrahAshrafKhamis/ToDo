namespace TodoAPI
{
    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int StatusId { get; set; }
        public Status Status { get; set; }
        public string? Comments { get; set; }
        public int? FlagId { get; set; }
        public virtual Flag? Flag { get; set; }
    }
}
