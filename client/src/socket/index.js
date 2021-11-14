import openSocket from 'socket.io-client';
import { serverPath } from '../config/keys';
const socket = openSocket(serverPath, {
    transports: ['websocket'],
    rejectUnauthorized: false
});
socket.on('connect', () => {
    console.log('connected');
});
export {
    socket
};
