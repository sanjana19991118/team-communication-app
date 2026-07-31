using Microsoft.EntityFrameworkCore;
using SignalFlow.Api.Data;
using SignalFlow.Api.DTOs;
using SignalFlow.Api.Models;

namespace SignalFlow.Api.Services
{
    public class MessageService
    {
        private readonly AppDbContext _db;

        public MessageService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<MessageResponseDto> SaveMessageAsync(Guid userId, CreateMessageDto dto)
        {
            var user = await _db.Users.FindAsync(userId);
            var message = new Message
            {
                ChannelId = dto.ChannelId,
                UserId = userId,
                Content = dto.Content,
                ParentMessageId = dto.ParentMessageId,
                SentAt = DateTime.UtcNow
            };

            _db.Messages.Add(message);
            await _db.SaveChangesAsync();

            return new MessageResponseDto(message.Id, message.ChannelId, message.Content, user?.Username ?? "Unknown", message.SentAt, message.ParentMessageId);
        }

        public async Task<List<MessageResponseDto>> GetChannelMessagesAsync(Guid channelId)
        {
            return await _db.Messages
                .Where(m => m.ChannelId == channelId)
                .Include(m => m.User)
                .OrderBy(m => m.SentAt)
                .Select(m => new MessageResponseDto(m.Id, m.ChannelId, m.Content, m.User!.Username, m.SentAt, m.ParentMessageId))
                .ToListAsync();
        }
    }
}