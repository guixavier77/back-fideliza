import express from 'express';
import cors from "cors";
import usersRouter from './routes/users.routes';
import storesRouter from './routes/stores.routes';
import awardsRouter from './routes/awards.routes';
import promotionsRouter from './routes/promotions.routes';
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(usersRouter)
app.use(storesRouter)
app.use(awardsRouter)
app.use(promotionsRouter)

app.listen(3333, () => console.log(`🚀 back fideliza listening on port 3333.`))
