using AutoMapper;
using EmployeeManagement.Data;
using EmployeeManagement.DTOs;
using EmployeeManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")] //Đây là route của API
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context; //Kết nối với DbContext và truy vấn và thao tác với cơ sở dữ liệu
        private readonly IMapper _mapper; //Sử dụng AutoMapper để ánh xạ giữa các đối tượng Employee và EmployeeDto

        public EmployeeController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("list")] //Route cho phương thức GET để lấy danh sách nhân viên
        public async Task<IActionResult> GetAll()
        {
            var employees = await _context.Employees.ToListAsync();//Truy vấn tất cả nhân viên từ cơ sở dữ liệu và trả về danh sách
            return Ok(employees); //Trả về danh sách nhân viên dưới dạng HTTP 200 tức thành công
        }

        [HttpGet("getdetail/{id}")]//Route cho phương thức GET để lấy thông tin chi tiết của một nhân viên theo ID
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _context.Employees.FindAsync(id);//Tìm kiếm nhân viên theo ID trong cơ sở dữ liệu
            if (employee == null) return NotFound();//Nếu không thấy thì trả về Not Found tức HTTP 400
            return Ok(employee);//Tìm thấy thì Ok
        }

        [HttpPost("create")]//Route cho phương thức POST để tạo mới một nhân viên
        public async Task<IActionResult> Create(EmployeeDto dto)
        {
            var employee = _mapper.Map<Employee>(dto);//Ánh xạ từ EmployeeDto sang Employee
            employee.CreatedAt = DateTime.UtcNow;//Gán thời gian hiện tại cho trường CreatedAt

            _context.Employees.Add(employee);//Thêm nhân viên vào DbContext
            await _context.SaveChangesAsync();//Rồi say đó lưu vào cơ sở dữ liệu
            return Ok(employee);//Trả về thông tin nhân viên OK
        }

        [HttpPut("update/{id}")]//Route cho phương thức PUT để cập nhật thông tin nhân viên
        public async Task<IActionResult> Update(int id, EmployeeDto dto)
        {
            var employee = await _context.Employees.FindAsync(id);//Tìm nhân viên theo ID
            if (employee == null) return NotFound();

            _mapper.Map(dto, employee);//Ánh xạ từ EmployeeDto sang Employee
            await _context.SaveChangesAsync();//Lưu vào cơ sở dữ liệu
            return Ok(employee);//Trả về thông tin nhân viên đã cập nhật 
        }

        [HttpDelete("delete/{id}")]//Route cho phương thức DELETE để xóa một nhân viên
        public async Task<IActionResult> Delete(int id)
        {
            var employee = await _context.Employees.FindAsync(id);//Tìm nhân viên theo  ID
            if (employee == null) return NotFound();

            _context.Employees.Remove(employee);//Xóa nhân viên khỏi Cơ sở dữ liệu
            await _context.SaveChangesAsync();// Lưu thay đổi vào cơ sở dữ liệu
            return NoContent();//Xóa thành công mà không trả về dữ liệu
        }
    }

}
