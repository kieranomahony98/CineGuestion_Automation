import express from 'express';
import mongoose from 'mongoose';
import { logger } from './helpers/logger';
import cors from 'cors';
import helmet from 'helmet';
import config from 'config';
import playlistApi from './routes/api/playlistApi';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
    logger.info(`app is listening to port ${8000}`);
});
// connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('Mongoose successfully connected');
    }).catch((err) => {
        logger.error(err);
    });

app.get('/', (req, res) => {
    res.send('Welcome to babel node');
});

app.use('/api/playlist', playlistApi);

