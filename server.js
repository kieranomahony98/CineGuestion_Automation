import express from 'express';
import mongoose from 'mongoose';
import { logger } from './helpers/logger';
import cors from 'cors';
import helmet from 'helmet';
import config from 'config';
import playlistApi from './routes/api/playlistApi';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.listen(config.get('PORT'), () => {
    logger.info(`app is listening to port ${config.get('PORT')}`);
});

// config mongodb
const db = config.get('MONGO_URI');
// connect to db
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('Mongoose successfully connected');
    }).catch((err) => {
        logger.error(err);
    });

app.get('/', (req, res) => {
    res.send('Welcome to babel node');
});

app.use('/api/playlist', playlistApi);

