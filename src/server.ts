/**TODO LIST:
 * 1. Handle upper and lower case letters for duplicate project names
 * 2. Handle file uploads for projects
 * 3. Add pagination
 * 4. Cascade delete
 */
import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import { connectDB } from './db';
import { projectRouter } from './routes/project.route';
import { BASE_URI } from './constants';
import cors from 'cors';
import { projectDesignTaskRouter } from './routes/projectDesignTask.route';
import { userProfileRouter } from './routes/userProfile.route';
import { userRouter } from './routes/user.route';
import { errorHandler } from './middleware/error';
import { publicRouter } from './routes/public.route';
import { authRouter } from './routes/auth.route';

connectDB();

dotenv.config({ path: path.join(__dirname, '..config/config.env') });

const app = express();

app.use(helmet());
// app.use(express.static(path.join(`${__dirname}/public`)));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(`${BASE_URI}/peenya`, projectRouter);
app.use(`${BASE_URI}/peenya`, projectDesignTaskRouter);
app.use(`${BASE_URI}/peenya`, userProfileRouter);
app.use(`${BASE_URI}/peenya`, userRouter);
app.use(`${BASE_URI}/peenya`, publicRouter);
app.use(`${BASE_URI}/peenya`, authRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Unhandled promise rejections
process.on('unhandledRejection', (err: { message: string }, promise) => {
  console.log(`Error: ${err.message}`);

  // Close the server process
  server.close(() => process.exit(1));
});
