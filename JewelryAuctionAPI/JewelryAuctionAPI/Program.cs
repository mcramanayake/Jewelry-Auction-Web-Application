using Microsoft.EntityFrameworkCore;
using JewelryAuctionAPI.Data;
using JewelryAuctionAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowAnyOrigin());
        
});

builder.Services.AddControllers();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the DbContext to use SQLite
builder.Services.AddDbContext<AuctionContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseStaticFiles(); // Enables serving static files from wwwroot
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Seed initial settings if they do not exist
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AuctionContext>();
    if (!context.Settings.Any())
    {
        context.Settings.Add(new Settings { IsMaintenanceMode = false });
        context.SaveChanges();
    }
}

app.Run();
