import { io, Socket } from 'socket.io-client';
import { SocketEvent } from '../enum';
import { OrderSocket } from '../interfaces/order';
import { envVariable } from './envVariable';
const ROOM_FOR_STAFF = 'staffRoom';
export const initSocketForStaff = () => {
  const socket = io(envVariable.API_ROOT, {
    reconnection: true,
    reconnectionAttempts: 3,
  });
  return socket;
};

export const joinRoomStaff = (socket: Socket) => {
  socket.emit(SocketEvent.JOIN_ROOM_STAFF_EVENT, ROOM_FOR_STAFF);
};

export const leaveRoomStaff = (socket: Socket) => {
  socket.emit(SocketEvent.LEAVE_ROOM_STAFF, ROOM_FOR_STAFF);
};

export const onListenEvent = (socket: Socket, event: string, callback: (order: OrderSocket) => void) => {
  socket.on(event, (data: OrderSocket) => callback(data));
};
