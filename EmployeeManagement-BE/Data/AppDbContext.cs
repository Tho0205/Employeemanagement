using EmployeeManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Data
{
    public class AppDbContext : DbContext // AppDBContext là lớp được kế thừa từ DBContext Để tương tác với cơ sở dữ liệu
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }//Constructor của AppDBContext nhận vào các tùy chọn cấu hình cho DBContext và truyền nó đến lớp cơ sở (base class) DBContext

        public DbSet<Employee> Employees { get; set; } //Getter và setter cho DbSet<Employee> Employees, đại diện cho bảng Employees trong cơ sở dữ liệu

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .HasIndex(e => e.Email)
                .IsUnique();
        }
    }

}
