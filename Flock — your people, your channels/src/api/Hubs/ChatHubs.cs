using Microsoft.AspNetCore.SignalR;
using SignalFlow.Api.DTOs;
using SignalFlow.Api.Services;

namespace SignalFlow.Api.Hubs
{
    public class ChatHub : Hub
    {
        private readonly MessageService _messageService;

        public ChatHub(MessageService messageService)
        {
            _messageService = messageService;
        }

        public async Task JoinChannel(string channelId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, channelId);
        }

        public async Task LeaveChannel(string channelId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, channelId);
        }

        public async Task SendMessage(Guid userId, CreateMessageDto dto)
        {
            var messageDto = await _messageService.SaveMessageAsync(userId, dto);
            await Clients.Group(dto.ChannelId.ToString()).SendAsync("ReceiveMessage", messageDto);
        }
    }
}