import React from 'react';

export default function ChannelList({ activeChannel, onSelectChannel }) {
  const channels = [
    { id: "11111111-1111-1111-1111-111111111111", name: "general" },
    { id: "33333333-3333-3333-3333-333333333333", name: "engineering" }
  ];

  return (
    <div className="w-64 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
      <h2 className="text-lg font-bold text-indigo-400 mb-4">SignalFlow</h2>
      <p className="text-xs text-gray-400 uppercase font-semibold mb-2">Channels</p>
      {channels.map((ch) => (
        <button
          key={ch.id}
          onClick={() => onSelectChannel(ch)}
          className={`w-full text-left px-3 py-2 rounded mb-1 text-sm ${
            activeChannel?.id === ch.id ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          # {ch.name}
        </button>
      ))}
    </div>
  );
}