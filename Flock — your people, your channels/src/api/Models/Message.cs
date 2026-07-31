using System;
using System.Collections.Generic;

namespace SignalFlow.Api.Models
{
    public class Message
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Content { get; set; } = string.Empty;
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        
        public Guid UserId { get; set; }
        public User? User { get; set; }
        
        public Guid ChannelId { get; set; }
        public Channel? Channel { get; set; }
        
        public Guid? ParentMessageId { get; set; }
        public Message? ParentMessage { get; set; }
        public List<Message> Replies { get; set; } = new();
    }
}