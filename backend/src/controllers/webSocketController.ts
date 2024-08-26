import { Server, Socket } from 'socket.io';
import { getGridData } from '../services/gridService';
import { config } from '../config';
// Function to handle WebSocket events
function handleEvents(socket: Socket): void {
  // Example custom event listener
  socket.on('message', (data: any) => {
    console.log('Message received:', data);

    // Send response back to the client
    socket.emit('message', 'Hello from server');
  });

  // Add more event listeners as needed
}

// Function to initialize WebSocket server
export function initializeWebSocket(io: Server): void {
  //   io.use((socket, next) => {
  //     const onevent = socket.onevent;
  //     //@ts-ignore
  //     socket.onevent = function (packet) {
  //       const [eventName, ...args] = packet.data || [];
  //       console.log('tokrn : ', socket.handshake.auth.token);
  //       console.log(`Event: ${eventName}`, args);
  //       onevent.call(socket, packet); // Call the original onevent handler
  //     };
  //     next();
  //   });

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
      //
      const gridData = getGridData();
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
