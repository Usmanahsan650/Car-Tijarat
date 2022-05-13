import React, { createContext, useEffect, useReducer } from 'react';
import { io } from 'socket.io-client';
import { SocketReducer } from '../reducers/SocketReducer';

export const SocketIOContext = createContext();

const SocketIOContextProvider = (props) => {

    const [socket, dispatch] = useReducer(SocketReducer, null);

    useEffect(() => {
        const socket = io('http://localhost:5000/namespace/auctionRoom');

        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        socket.on('connect', () => {
            console.log('Socket id: ', socket.id);
            dispatch({type: 'CONNECTED', socket});
        });
    }, []);

    return ( 
        <SocketIOContext.Provider value={ { socket, dispatch } }>
            { socket && props.children }
        </SocketIOContext.Provider>
    );
}
 
export default SocketIOContextProvider;