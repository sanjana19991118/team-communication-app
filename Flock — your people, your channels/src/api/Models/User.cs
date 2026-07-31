using System;
using System.Collections.Generic;

namespace SignalFlow.Api.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public bool IsOnline { get; set; } = false;
        public List<Message> Messages { get; set; } = new();
    }
}