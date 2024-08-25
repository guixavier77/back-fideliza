import express from 'express';
import user from './routes/users.routes';
import usersRouter from './routes/users.routes';
const app = express();

app.use(express.json());

app.use("/users", usersRouter)


app.listen(3333, () => console.log(`🚀 back fideliza listening on port 3333.`))
