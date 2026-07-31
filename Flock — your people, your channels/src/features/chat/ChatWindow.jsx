import React, { useEffect, useState } from 'react';
import { useSignalR } from '../../hooks/useSignalR';
import { useAuthStore } from '../auth/useAuthStore';
import PresenceBadge from '../presence/PresenceBadge';

export default function ChatWindow({ channel }) {
  const chatConn = useSignalR('http://localhost:5000/hubs/chat');
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (chatConn && channel) {
      chatConn.invoke('JoinChannel', channel.id);

      chatConn.on('ReceiveMessage', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        chatConn.invoke('LeaveChannel', channel.id);
        chatConn.off('ReceiveMessage');
      };
    }
  }, [chatConn, channel]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !chatConn) return;

    const payload = { channelId: channel.id, content: input, parentMessageId: null };
    await chatConn.invoke('SendMessage', user.id, payload);
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900 text-white">
      <div className="h-14 border-b border-gray-800 px-6 flex items-center justify-between">
        <h3 className="font-semibold text-lg"># {channel?.name}</h3>
        <PresenceBadge />
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="bg-gray-800 p-3 rounded border border-gray-750">
            <div className="flex items-center space-x-2 text-xs text-indigo-400 mb-1">
              <span className="font-bold">{m.senderName}</span>
              <span className="text-gray-500">{new Date(m.sentAt).toLocaleTimeString()}</span>
            </div>
            <p className="text-sm">{m.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-gray-800 border-t border-gray-700 flex gap-2">
        <input
          className="flex-1 bg-gray-900 border border-gray-700 px-4 py-2 rounded text-sm focus:outline-none focus:border-indigo-500"
          placeholder={`Message #${channel?.name}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded text-sm font-medium">
          Send
        </button>
      </form>
    </div>
  );
}