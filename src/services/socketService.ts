import { io, Socket } from 'socket.io-client';
import Order from '../interfaces/order';

const ROOM_FOR_STAFF = 'staffRoom';

export const initSocketForStaff = (URL: string, event: string) => {
  const socket = io(URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 100,
  });
  socket.emit(event, ROOM_FOR_STAFF);
  return socket;
};

export const onListenEvent = (socket: Socket, event: string, callback: (order: Order) => void) => {
  socket.on(event, (data: Order) => callback(data));
};
