import app from './app';
import { config } from './config';
import mongoose from 'mongoose';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { initializeWebSocket } from './controllers/webSocketController';

let shuttingDown = false;

const port = config.port;
const env = config.env;
const httpServer = http.createServer(app);
httpServer.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Env: ${env}`);
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

const io = new Server(httpServer, {
  cors: {
    origin: '*', //need to change in prod 
  },
  transports: ['websocket', 'polling'],
});
initializeWebSocket(io);

async function gracefulShutdown() {
  if (shuttingDown) {
    console.info('Already shutting down');
    return;
  }

  shuttingDown = true;
  console.info('Shutting down...');

  await mongoose.connection.close();

  httpServer.close(() => {
    console.info('Server closed');
    process.exit(0);
  });

  // Force close connections after 10 seconds
  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
