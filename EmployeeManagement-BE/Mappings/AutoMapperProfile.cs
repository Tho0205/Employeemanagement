using AutoMapper;
using EmployeeManagement.DTOs;
using EmployeeManagement.Models;

namespace EmployeeManagement.Mappings
{
    public class AutoMapperProfile : Profile//AutoMapperProfile kế thư từ Profile Của AutoMapper để ánh xạ các đối tượng
    {
        // Constructor tạo bản đồ ảnh xạ từ Employee sang EmployeeDto và ngược lại nhờ vào ReverseMap()
        public AutoMapperProfile()
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();
        }
        //Nhờ đây ta có thẻ tạo ra dto = mapper.Map<EmployeeDto>(employee) và ngược lại
        //Tạo được thêm cả model = mapper.Map<Employee>(employeeDto)
    }

}
