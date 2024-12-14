import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import express, { Application } from 'express';
import { errorHandler } from './middleware/error-handler';
import { notFound } from './middleware/not-found';
import taskRoutes from './routes/tasks.routes';

const app: Application = express();
const prisma = new PrismaClient();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/api/v1/tasks', taskRoutes);

// Serve static files
app.use(express.static('./public'));

// Handle 404s
app.use(notFound);

// Handle errors
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => {
    process.exit(0);
  });
});
