import express from 'express';
import { logger } from '../../helpers/logger';
import { getWeeklyPlaylistAllUsers } from '../../services/controller';

const router = express.Router();


router.post('/testing', async (req, res) => {
    getWeeklyPlaylistAllUsers()
        .then((weeklyPlaylists) => {
            return res.send(JSON.stringify(weeklyPlaylists));
        })
        .catch(err => {
            logger.error(`Failed to get playlists within route: ${err.message}`);
            return res.send(404).send("Failed to get user movies from database");
        });
})
export default router;


