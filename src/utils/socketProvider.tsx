import io from 'socket.io-client';
import React, { ReactChild } from 'react';

const socket = io('http://localhost:8080', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 99999,
});
socket.emit('joinRoomStaff', 'staffRoom');
console.log('socket connected and join room');
type socketType = typeof socket;
type Props = {
  children: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
};
export const SocketContext = React.createContext<socketType>(socket);

export const SocketProvider = (props: Props) => {
  return <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>;
};
