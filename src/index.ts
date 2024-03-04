// src/index.ts
import { createServer } from 'http';
import app from './app';
import sequelize from './config/sequelize';

const PORT = process.env.PORT || 3001;

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    const server = createServer(app);

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
