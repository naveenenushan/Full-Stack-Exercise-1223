import { Server, Socket } from 'socket.io';
import { getGridData } from '../services/gridService';
import { config } from '../config';
let letterValue: string;

function handleEvents(socket: Socket): void {


  socket.on('letter', (letter: string) => {
    console.log('Message received:', letter);
    letterValue = letter;
    
  });


}


export function initializeWebSocket(io: Server): void {


  io.use(async (socket, next) => {
    try {
      const authHeader = socket.handshake.auth.token;
      if (authHeader) {
        const headers = authHeader.split(' ');
        const token = headers.length > 1 ? headers[1] : headers[0];

        if (!token || token != config.token) {
          const err = new Error('unauthorized');
          return next(err);
        }

        next();
      } else {
        console.log('error');
        const err = new Error('unauthorized');
        return next(err);
      }
    } catch (e) {
      console.error(e);
      next(new Error('unauthorized'));
    }
  });

  // Handle connection event
  io.on('connection', (socket: Socket) => {
    console.log('A new client connected:', socket.id);

    const intervalId = setInterval(() => {
      
      
      const gridData = getGridData(letterValue);
      socket.emit('grid', gridData);
    }, 2000); // Every 2 seconds

    handleEvents(socket);

    // Handle disconnection
    socket.on('disconnect', () => {
      clearInterval(intervalId);
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}
