import { getMoviesFromDatabase } from "./movieDbService";
import { getWeeklyPlaylist } from "./weeklyPlaylist";
import cron from 'node-cron';

cron.schedule('0 0 0 * * 0', () => {
    const lastWeek = new Date().getTime() - (86400000 * 7);
    getWeeklyPlaylistAllUsers(new Date(lastWeek).toISOString());
});
cron.schedule('0 0 0 1 * *', () => {
    const thisMonth = new Date().getMonth();
    const lastMonth = (thisMonth == 0) ? new Date().setMonth(11) : new Date().setMonth(thisMonth - 1);
    getMonthlyPlaylistForUser(lastMonth);
});

async function userProcessing(allUsers, lastWeek) {
    const userPlaylists = [];
    for (const user of allUsers) {
        userPlaylists.push(getWeeklyPlaylist(user, lastWecek));
    }
    return Promise.all(userPlaylists);
}

async function singleUserProccessing(user) {
    const promises = [];
    const weeklyPlaylist = await getWeeklyPlaylist(user.userMovies);
    return {
        userId: user.userId,
        weeklyPlaylist
    }
}

export async function getWeeklyPlaylistAllUsers(lastWeek) {
    return (
        getMoviesFromDatabase()
            .then((allUsers) => userProcessing(allUsers, lastWeek, "weekly"))
            .then((playlists) => playlists)
    )
}

export async function getMonthlyPlaylistForUser(lastMonth) {
    return (
        getMoviesFromDatabase()
            .then((allUsers) => userProcessing(allUsers, lastMonth, "monthly"))
            .then((playlists) => playlists)
    )
}
