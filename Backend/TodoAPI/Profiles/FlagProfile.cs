using AutoMapper;
using TodoAPI.DTOs;

namespace TodoAPI.Profiles
{
    public class FlagProfile:Profile
    {
        public FlagProfile()
        {
            CreateMap<Flag, FlagWriteDTO>().ReverseMap();
        }
    }
}
