import React, { useEffect, useState } from 'react';
import { useSignalR } from '../../hooks/useSignalR';

export default function PresenceBadge() {
  const presenceConn = useSignalR('http://localhost:5000/hubs/presence');
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (presenceConn) {
      setIsOnline(true);
      presenceConn.on("UserOnline", () => setIsOnline(true));
      presenceConn.on("UserOffline", () => setIsOnline(false));
    }
  }, [presenceConn]);

  return (
    <div className="flex items-center space-x-2">
      <span className={`h-3 w-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
      <span className="text-xs text-gray-300">{isOnline ? 'Online' : 'Offline'}</span>
    </div>
  );
}