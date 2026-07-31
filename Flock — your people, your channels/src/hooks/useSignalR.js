import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export function useSignalR(hubUrl) {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    conn.start().then(() => setConnection(conn)).catch(console.error);

    return () => conn.stop();
  }, [hubUrl]);

  return connection;
}