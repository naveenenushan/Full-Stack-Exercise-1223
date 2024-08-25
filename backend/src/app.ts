import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import routes from './routes';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { config } from './config';
import mongoose from 'mongoose';

require('dotenv').config();

const app = express();
if (config.env === 'local') {
  app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const connectDatabase = async () => {
  try {
    await mongoose.connect(`${config.mongoURI}/FSE1223`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

(async () => {
  await connectDatabase();
})();

export default app;
