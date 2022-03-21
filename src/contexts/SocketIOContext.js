import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketIOContext = createContext();

const SocketIOContextProvider = (props) => {

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io('http://localhost:5000/namespace/auctionRoom');

        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        socket.on('connect', () => {
            console.log('Socket id: ', socket.id);
            setSocket(socket);
        });
    }, []);

    return ( 
        <SocketIOContext.Provider value={ { socket } }>
            { props.children }
        </SocketIOContext.Provider>
    );
}
 
export default SocketIOContextProvider;