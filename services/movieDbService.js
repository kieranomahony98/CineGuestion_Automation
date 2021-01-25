import { remove } from 'winston';
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
    const playlist = (type === 0) ? 'userPlaylists.weeklyPlaylists' : (type === 1) ? 'userPlaylists.monthlyPlaylists' : 'userPlaylists.allTimePlaylists';

    return await MovieSchema.updateOne({ _id: id }, { $set: { [playlist]: results } })
        .then((user) => true)
        .catch((err) => {
            logger.error(`Failed to write to database: ${err.message}`);
            throw err;
        });
}
