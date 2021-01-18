import { logger } from '../helpers/logger';
import MovieSchema from '../mongoModels/movieModel';

/**
 * get movie curation for a user
 * @param {String} userId
 */
export async function getMoviesFromDatabase() {
    try {
        return await MovieSchema.find({})
            .then((users) => users);
    } catch (err) {
        logger.error(`failed to retrieve user movies for automation`);
        throw err;
    }
}

export async function writeToDB(id, results, playlist) {
    if (type === 'weekly') {
        const user = MovieSchema.update({ _id: id }, { $set: { 'userPlaylist.weeklyPlaylists': results } })
            .then((user) => user)
            .catch((err) => {
                logger.error(`Failed to find user in database: ${err.message}`);
                throw err;
            });
    }

    if (type === 'monthly') {
        const user = MovieSchema.update({ _id: id }, { $set: { 'userPlaylist.monthylPlaylists': results } })
            .then((user) => user)
            .catch((err) => {
                logger.error(`Failed to find user in database: ${err.message}`);
                throw err;
            });
    }
}




