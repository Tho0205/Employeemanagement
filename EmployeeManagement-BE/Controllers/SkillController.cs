using EmployeeManagement.Data;
using EmployeeManagement.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SkillController(AppDbContext context)
        {
            _context = context;
        }

        // 1. Tạo skill mới
        [HttpPost("create")]
        public async Task<IActionResult> CreateSkill([FromBody] SkillCreateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Tên kỹ năng không được để trống");

            var exists = await _context.Skills.AnyAsync(s => s.Name == dto.Name);
            if (exists) return BadRequest("Kỹ năng đã tồn tại");

            var skill = new Skill { Name = dto.Name };
            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();

            return Ok(skill);
        }

        // 2. Gán skill cho nhân viên
        [HttpPost("assign")]
        public async Task<IActionResult> AssignSkill(int employeeId, int skillId)
        {
            var exists = await _context.EmployeeSkills
                .AnyAsync(es => es.EmployeeId == employeeId && es.SkillId == skillId);
            if (exists) return BadRequest("Skill already assigned.");

            var es = new EmployeeSkill { EmployeeId = employeeId, SkillId = skillId };
            _context.EmployeeSkills.Add(es);
            await _context.SaveChangesAsync();

            return Ok("Skill assigned successfully.");
        }

        // 3. Lấy danh sách tất cả skill
        [HttpGet("list")]
        public async Task<IActionResult> GetAllSkills()
        {
            var skills = await _context.Skills.ToListAsync();
            return Ok(skills);
        }

        // 4. Thống kê: mỗi skill có bao nhiêu nhân viên
        [HttpGet("statistics")]
        public async Task<IActionResult> GetSkillStatistics()
        {
            var stats = await _context.Skills
                .Select(skill => new
                {
                    Skill = skill.Name,
                    EmployeeCount = skill.EmployeeSkills.Count
                })
                .ToListAsync();

            return Ok(stats);
        }
    }
}
