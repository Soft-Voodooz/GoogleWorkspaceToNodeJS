import express, {Request, Response} from "express";
import cors from 'cors';

import { config } from './config/config';
import router  from './routes/driveRoute';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cors({ origin: '*' }));

app.get('/', (_req: Request, res: Response) => {
    return res.json('Established connection!');
});

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}`));
app.use('/api/drive', router);