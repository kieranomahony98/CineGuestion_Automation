import express from 'express';
import { logger } from '../../helpers/logger';
import { doAll } from '../../services/controller';
const router = express.Router();


router.post('/testing', async (req, res) => {
    doAll()
        .then((weeklyPlaylists) => {
            return res.send(JSON.stringify(weeklyPlaylists));
        })
        .catch(err => {
            logger.error(`Failed to get playlists within route: ${err.message}`);
            return res.status(404).send("Failed to get user movies from database");
        });
});

router.post('/test', async (req, res) => {
    res.send("im working");
});

export default router;


