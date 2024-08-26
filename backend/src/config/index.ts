export const config = {
  port: process.env.PORT || 3300,
  env: process.env.NODE_ENV || 'local',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017',
  token:  process.env.TOKEN || 'test-token',
};
