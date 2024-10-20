using Jewelry_Acution_Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add database context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy to allow localhost:3001
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3001",
        builder => builder.WithOrigins("http://localhost:3000") // Allow requests from this origin
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

// Add controllers
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use the CORS policy for localhost:3001
app.UseCors("AllowLocalhost3001"); // Change to your specific CORS policy name

app.UseAuthorization();

app.MapControllers();

app.Run();
