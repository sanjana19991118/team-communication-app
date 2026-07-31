using Microsoft.AspNetCore.Mvc;
using SignalFlow.Api.DTOs;
using SignalFlow.Api.Services;

namespace SignalFlow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly MessageService _messageService;

        public MessagesController(MessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet("channel/{channelId:guid}")]
        public async Task<IActionResult> GetChannelMessages(Guid channelId)
        {
            var messages = await _messageService.GetChannelMessagesAsync(channelId);
            return Ok(messages);
        }
    }
}