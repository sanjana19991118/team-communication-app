using Microsoft.EntityFrameworkCore;
using SignalFlow.Api.Data;
using SignalFlow.Api.Hubs;
using SignalFlow.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));

builder.Services.AddScoped<MessageService>();

// SignalR with Redis Pub/Sub Backplane
var redisConn = builder.Configuration.GetConnectionString("Redis") ?? "localhost:6379";
builder.Services.AddSignalR().AddStackExchangeRedis(redisConn);

builder.Services.AddCors(opt => {
    opt.AddPolicy("CorsPolicy", p => p.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials());
});

var app = builder.Build();

app.UseCors("CorsPolicy");
app.MapControllers();
app.MapHub<ChatHub>("/hubs/chat");
app.MapHub<PresenceHub>("/hubs/presence");

app.Run();