import { getMoviesFromDatabase } from "./movieDbService";
import { getPlaylist } from "./playlistGenerator";
import cron from 'node-cron';
import { logger } from "../helpers/logger";

cron.schedule('0 0 0 * * 0', () => {
    const lastWeek = new Date().getTime() - (86400000 * 7);
    getWeeklyPlaylist(new Date(lastWeek).toISOString());
});

cron.schedule('0 0 0 1 * *', () => {
    const thisMonth = new Date().getMonth();
    const lastMonth = (thisMonth == 0) ? new Date().setMonth(11) : new Date().setMonth(thisMonth - 1);
    const date = new Date(lastMonth).toISOString();
    getMonthlyPlaylistForUser(date);
});

cron.schedule('0 0 0 * * 1', () => {
    const thisMonth = new Date().getMonth();
    const lastMonth = (thisMonth == 0) ? new Date().setMonth(11) : new Date().setMonth(thisMonth - 1);
    const date = new Date(lastMonth).toISOString();
    getMonthlyPlaylistForUser(date);
    getTrendingNow();
});

cron.schedule('* * * * * *', () => {
    console.log('in job for demo');
});

async function userProcessing(allUsers, date, type) {
    try {
        const userPlaylists = [];
        for (const user of allUsers) {
            userPlaylists.push(getPlaylist(user, date, type));
        }
        return Promise.all(userPlaylists);
    } catch (err) {
        logger.error(`Failed to process users: ${err.message}`);
        throw err;
    }

}
async function playlistCreationController(type, date) {
    return (
        getMoviesFromDatabase()
            .then((allUsers) => userProcessing(allUsers, date, type))
            .then((playlists) => playlists)
            .catch((err) => {
                logger.error(`Failer in controller: ${err.message}`);
                throw err;
            }));
}

export async function getWeeklyPlaylist() {
    let lastWeek = new Date().getTime() - (86400000 * 7);
    return await playlistCreationController(0, new Date(lastWeek).toISOString())
        .then((playlists) => playlists)
        .catch((err) => {
            logger.error(`Failed to get weeekly playlists: ${err.message}`);
        });
}

export async function getMonthlyPlaylistForUser() {
    let date = new Date();
    date = date.setMonth(date.getMonth() - 1);
    return playlistCreationController(1, new Date(date).toISOString())
        .then((playlists) => playlists)
        .catch((err) => {
            logger.error(`Failed to get playlists: ${err.message}`);
            throw err;
        });
}

export async function getAllTimePlaylist() {
    return await playlistCreationController(2, null)
        .then((playlists) => playlists)
        .catch((err) => {
            logger.error(`Failed to get all time playlists: ${err.message}`);
        });
}

async function getTrendingNow() {
    let lastWeek = new Date().getTime() - (86400000);
    lastWeek = new Date(lastWeek).toISOString();
    return await getMoviesFromDatabase()
        .then(async (allUserData) => {
            const userMovies = [].concat.apply([], allUserData.map((user) => {
                return user.userMovies.filter((generation) => generation.movieGenerationDate >= lastWeek);
            }));
            const playlist = await getPlaylist(userMovies, null, 3)
                .then((playlist) => playlist)
                .catch((err) => {
                    logger.error(`failed to get playlists: ${err.message}`);
                })
            return playlist;
        });
}

export async function doAll() {
    await getWeeklyPlaylist();
    await getMonthlyPlaylistForUser();
    await getAllTimePlaylist();
    await getTrendingNow();
    return true
}

