import React, { ReactChild } from 'react';

import { Socket } from 'socket.io-client';
import { SocketEvent } from '../enum';
import { envVariable } from '../services/envVariable';
import { initSocketForStaff } from '../services/socketService';

const socket = initSocketForStaff(envVariable.API_ROOT, SocketEvent.JOIN_ROOM_STAFF_EVENT);

type Props = {
  children: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
};
export const SocketContext = React.createContext<Socket>(socket);

export const SocketProvider = (props: Props) => {
  return <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>;
};
