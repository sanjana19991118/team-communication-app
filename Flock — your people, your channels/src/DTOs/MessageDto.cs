using System;

namespace SignalFlow.Api.DTOs
{
    public record CreateMessageDto(Guid ChannelId, string Content, Guid? ParentMessageId);
    public record MessageResponseDto(Guid Id, Guid ChannelId, string Content, string SenderName, DateTime SentAt, Guid? ParentMessageId);
}