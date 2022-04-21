using AutoMapper;
using TodoAPI.DTOs;

namespace TodoAPI.Profiles
{
    public class TodoProfile:Profile
    {
        public TodoProfile()
        {
            CreateMap<TodoWriteDTO, Todo>().ReverseMap();
            CreateMap<Todo, TodoReadDTO>().ReverseMap();
                //.ForMember(dest => dest.Flag, opt => opt.MapFrom(src => new FlagWriteDTO(){Name= src.Flag.Name, Color= src.Flag.Color }))
                //.ForMember(dest => dest.Status, opt => opt.MapFrom(src => new StatusWriteDTO(){ Name = src.Status.Name, Color = src.Status.Color }));
        }
    }
}
