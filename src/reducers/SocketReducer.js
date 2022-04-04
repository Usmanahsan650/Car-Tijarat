export const SocketReducer = (state, action) => {
    switch(action.type){

        case 'CONNECTED':
            return action.socket;

        case 'JOIN_ROOM':
            state.emit('auction:joinRoom', { RoomID: action.RoomID, BiddingID: action.BiddingID });
            return state;

        case 'BID_PLACED':
            state.emit('auction:bidPlaced', { RoomID: action.RoomID, bid: action.bid, bidderID: action.bidderID });
            return state;

        case 'END_AUCTION':
            state.emit('auction:end', { RoomID: action.RoomID, BiddingID: action.BiddingID });
            return state;

        default:
            return state;
    }
};