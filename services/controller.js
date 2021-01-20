import { getMoviesFromDatabase } from "./movieDbService";
import { getWeeklyPlaylist } from "./weeklyPlaylist";
import cron from 'node-cron';
import { logger } from "../helpers/logger";

cron.schedule('0 0 0 * * 0', () => {
    const lastWeek = new Date().getTime() - (86400000 * 7);
    getWeeklyPlaylistAllUsers(new Date(lastWeek).toISOString());
});
cron.schedule('0 0 0 1 * *', () => {
    const thisMonth = new Date().getMonth();
    const lastMonth = (thisMonth == 0) ? new Date().setMonth(11) : new Date().setMonth(thisMonth - 1);
    const date = new Date(lastMonth).toISOString();
    getMonthlyPlaylistForUser(date);
});

async function userProcessing(allUsers, lastWeek, type) {
    try {
        const userPlaylists = [];
        for (const user of allUsers) {
            userPlaylists.push(getWeeklyPlaylist(user, lastWeek, type));
        }
        return Promise.all(userPlaylists);
    } catch (err) {
        logger.error(`Failed to process users: ${err.message}`);
        throw err;
    }

}

async function singleUserProccessing(user) {
    const promises = [];
    const weeklyPlaylist = await getWeeklyPlaylist(user.userMovies);
    return {
        userId: user.userId,
        weeklyPlaylist
    }
}

export async function getWeeklyPlaylistAllUsers() {
    const lastWeek = new Date().getTime() - (86400000 * 7);
    return (
        getMoviesFromDatabase()
            .then((allUsers) => userProcessing(allUsers, lastWeek, 0))
            .then((playlists) => playlists)
            .catch((err) => {
                logger.error(`Failed to get weekly playlists: ${err.message}`);
                throw err;
            })
    )
}

export async function getMonthlyPlaylistForUser(lastMonth) {
    return (
        getMoviesFromDatabase()
            .then((allUsers) => userProcessing(allUsers, lastMonth, 1))
            .then((playlists) => playlists)
    )
}
