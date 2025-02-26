import express from 'express';
import cors from "cors";
import usersRouter from './routes/users.routes';
import storesRouter from './routes/stores.routes';
import awardsRouter from './routes/awards.routes';
import promotionsRouter from './routes/promotions.routes';
import launcherPointsRouter from './routes/launcherPoints.routes';
import reportsRouter from './routes/reports.routes';
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.NODE_PORT || '3333'

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(usersRouter)
app.use(storesRouter)
app.use(awardsRouter)
app.use(promotionsRouter)
app.use(launcherPointsRouter)
app.use(reportsRouter)

app.listen(parseInt(port), host, () => console.log(`🚀 back fideliza listening on port ${port}.`))
