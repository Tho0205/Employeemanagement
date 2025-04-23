using EmployeeManagement.Data;
using EmployeeManagement.Mappings;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Khởi tạo Web API App cho phép cấu hình các dịch vụ như Controller, Swagger, DbContext, AutoMapper
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers(); // Xử lý các yêu cầu HTTP và ánh xạ chúng đến các phương thức trong Controller
            builder.Services.AddEndpointsApiExplorer(); // Từ động tạo API từ Controller

            // Cấu hình Swagger để tạo giao diện API nhanh cho người dùng
            //builder.Services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
            //    {
            //        Title = "Employee Management API", // Xóa ký tự dư 'z'
            //        Version = "v1",
            //        Description = "API for managing employees"
            //    });
            //});
            builder.Services.AddSwaggerGen();
            // Cấu hình DbContext với PostgreSQL
            //builder.Services.AddDbContext<AppDbContext>(options =>
            //    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Cấu hình AutoMapper để ánh xạ model và DTO
            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddCors(opt =>
            {
                opt.AddPolicy("AllowReact", policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });
            //var app = builder.Build(); // Tạo app từ những gì đã cấu hình bên trên

            // Cấu hình Swagger UI
            //if (app.Environment.IsDevelopment())
            //{
            //    app.UseSwagger();
            //    app.UseSwaggerUI(c =>
            //    {
            //        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Employee Management API v1");
            //        c.RoutePrefix = string.Empty; // Truy cập Swagger UI tại đường dẫn gốc thay vì /swagger
            //    });
            //}
            var app = builder.Build();
            app.UseCors("AllowReact");

            app.UseHttpsRedirection(); // Chuyển hướng tất cả yêu cầu HTTP đến HTTPS
            app.UseAuthorization();
            app.MapControllers(); // Map Các Route đến Controller
            app.UseSwagger();
            app.UseSwaggerUI();
            app.Run(); // Cuối cùng là chạy ứng dụng
        }
    }
}
