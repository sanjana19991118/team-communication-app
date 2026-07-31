import React, { useState } from 'react';
import ChannelList from './features/channels/ChannelList';
import ChatWindow from './features/chat/ChatWindow';

export default function App() {
  const [activeChannel, setActiveChannel] = useState({
    id: "11111111-1111-1111-1111-111111111111",
    name: "general"
  });

  return (
    <div className="flex h-screen font-sans">
      <ChannelList activeChannel={activeChannel} onSelectChannel={setActiveChannel} />
      <ChatWindow channel={activeChannel} />
    </div>
  );
}