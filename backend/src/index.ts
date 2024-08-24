import app from './app';
import { config } from './config';
let shuttingDown = false;

const port = config.port;
const env = config.env;

const server = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Env: ${env}`);
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

function gracefulShutdown() {
  if (shuttingDown) {
    console.info('Already shutting down');
    return;
  }

  shuttingDown = true;
  console.info('Shutting down...');

  server.close(() => {
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
