namespace EmployeeManagement.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Position { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<EmployeeSkill> EmployeeSkills { get; set; }

    }

}
