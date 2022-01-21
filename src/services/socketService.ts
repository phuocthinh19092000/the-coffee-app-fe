import { ActionCreatorWithPayload, AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
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

export const onListenEvent = (
  socket: Socket,
  dispatch: Dispatch<AnyAction>,
  action: ActionCreatorWithPayload<Order, string>,
  event: string,
) => {
  socket.on(event, (data: Order) => dispatch(action(data)));
};
