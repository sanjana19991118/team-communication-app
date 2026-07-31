using System;
using System.Collections.Generic;

namespace SignalFlow.Api.Models
{
    public class Channel
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<Message> Messages { get; set; } = new();
    }
}