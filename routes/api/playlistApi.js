import express from 'express';
import { getWeeklyPlaylistAllUsers } from '../../services/controller';

const router = express.Router();

router.post('weekly', (req, res) => {

});
router.post('montly', (req, res) => {

});
router.post('allTime', (req, res) => {
});

router.post('/testing', async (req, res) => {
    res.send(JSON.stringify(await getWeeklyPlaylistAllUsers()));
})
export default router;


