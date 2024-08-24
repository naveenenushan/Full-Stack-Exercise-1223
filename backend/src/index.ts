import app from './app';
import { config } from './config';

const port = config.port;
const env = config.env;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Env: ${env}`);
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
