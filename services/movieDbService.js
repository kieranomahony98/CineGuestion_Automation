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

export async function writeToDB(id, results, type) {
    if (type === 0) {
        return await MovieSchema.updateOne({ _id: id }, { $set: { weeklyPlaylists: results } })
            .then((user) => true)
            .catch((err) => {
                logger.error(`Failed to write to database: ${err.message}`);
                throw err;
            });
    }

    if (type === 1) {
        return await MovieSchema.updateOne({ _id: id }, { $set: { 'userPlaylist.monthylPlaylists': results } })
            .then((user) => true)
            .catch((err) => {
                logger.error(`Failed to find user in database: ${err.message}`);
                throw err;
            });
    }
}




