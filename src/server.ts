import express from 'express';
import cors from "cors";
import usersRouter from './routes/users.routes';
import storesRouter from './routes/stores.routes';
const app = express();

app.use(express.json());
app.use(cors());
app.use(usersRouter)
app.use(storesRouter)


app.listen(3333, () => console.log(`🚀 back fideliza listening on port 3333.`))
