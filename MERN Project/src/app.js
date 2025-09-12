import express from 'express'
const app = express();
import healthCheckRouter from './routes/healthcheck.routes.js';

app.use(express.json());
app.use("/api/v1/healthcheck" , healthCheckRouter)

export default app