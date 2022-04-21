using AutoMapper;
using TodoAPI.DTOs;

namespace TodoAPI.Profiles
{
    public class StatusProfile:Profile
    {
        public StatusProfile()
        {
            CreateMap<Status, StatusWriteDTO>().ReverseMap();
        }
    }
}
