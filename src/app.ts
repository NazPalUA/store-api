import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import express, { Application } from 'express';
import { errorMiddleware } from './middleware/error-handler';
import { notFoundMiddleware } from './middleware/not-found';
import productRoutes from './routes/products.routes';
import taskRoutes from './routes/tasks.routes';
const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/products', productRoutes);

app.use(express.static('./public'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port: number = Number(process.env.PORT) || 3000;
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
