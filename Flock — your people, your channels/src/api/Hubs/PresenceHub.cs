using Microsoft.AspNetCore.SignalR;

namespace SignalFlow.Api.Hubs
{
    public class PresenceHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.Others.SendAsync("UserOnline", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Clients.Others.SendAsync("UserOffline", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}