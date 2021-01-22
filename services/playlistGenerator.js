import { matchedGenres, listMatcher } from '../helpers/genres';
import { logger } from '../helpers/logger';
import movieDb from './tmdbController';
import { writeToDB } from './movieDbService';
async function filterMovies(movies, date) {
    const leaderBoard = {
        with_genres: {},
        with_keywords: {},
        sort_by: {}
    };
    console.log(date);
    console.log(movies.length);
    const moviesThisWeek = (!date) ? movies : movies.filter((movieGeneration) => {
        if (movieGeneration.movieGenerationDate >= date) {
            return movieGeneration.movieSearchCriteria;
        }
    });
    console.log(moviesThisWeek.length);
    if (date) {
        // console.log(moviesThisWeek);ss
    }

    try {
        for (const generation of moviesThisWeek) {
            for (const [key, value] of Object.entries(generation.movieSearchCriteria)) {
                if (value !== undefined && value != "" && (leaderBoard.hasOwnProperty(key))) {
                    const values = (key == 'with_genres') ? (generation.movieSearchCriteria["with_genres"][0].split(",")) : (key == 'with_keywords') ? (generation.movieSearchCriteria["with_keywords"].split(",")) : [value];
                    for (const value of values) {
                        leaderBoard[key][value] = (leaderBoard[key][value]) ? leaderBoard[key][value] + 1 : 1;
                    }
                }
            }
        }
    } catch (err) {
        logger.error(`failed to filter movies: ${err}`);
        throw err;
    }
    return {
        leaderBoard,
        count: moviesThisWeek.length
    };
}

async function normiliseData({ leaderBoard, count }) {
    try {
        for (const characteristic in leaderBoard) {
            for (const value in leaderBoard[characteristic]) {
                leaderBoard[characteristic][value] = leaderBoard[characteristic][value] / count;
            }
        }
        return leaderBoard;
    } catch (err) {
        logger.error(`Failed to normalise data: ${err.message}`);
        throw err;
    }
}

async function compareData(leaderBoard) {
    const comparedData = {
        with_genres: {
            k: null,
            k2: null,
            v: 0,
            v2: 0
        },
        with_keywords: {
            k: null,
            v: 0,
        },
        sort_by: {
            k: null,
            v: 0,
        },
    }
    for (const [key, value] of Object.entries(leaderBoard)) {
        try {
            if (leaderBoard.hasOwnProperty(key)) {
                for (const [k, v] of Object.entries(leaderBoard[key])) {
                    if (key === 'with_genres') {
                        if (v > comparedData[key].v) {
                            comparedData[key].k = k;
                            comparedData[key].v = v;
                        } else {
                            if (v > comparedData[key].v2) {
                                comparedData[key].k2 = k;
                                comparedData[key].v2 = v;
                            }
                        }
                    } else {
                        if (v > comparedData[key].v) {
                            comparedData[key].k = k;
                            comparedData[key].v = v;
                        }
                    }
                    continue;
                }
            }
        } catch (err) {
            logger.error(`Failed to compare data: ${err.message}`);
            throw err;
        }
    }
    return comparedData;
}

async function createQuery({ with_genres, with_keywords, sort_by }) {
    try {
        const queryObj = {
            with_genres: (with_genres.k) ? with_genres.k : null,
            with_keywords: with_keywords.k,
            sort_by: sort_by.k,
        };

        const mostPopularGenre = (with_genres.k2) ? with_genres.k2 : with_genres.k ? k : null;
        if (mostPopularGenre) {
            for (const c of matchedGenres[mostPopularGenre]) {
                if (mostPopularGenre !== c) {
                    queryObj.with_genres = (with_genres) ? `${queryObj.with_genres}, ${c}` : null;
                    break;
                }
            }
        }

        for (const [key, value] in Object.entries(queryObj)) {
            if (!value) {
                delete queryObj[key];
            }
        }
        return queryObj;
    } catch (err) {
        logger.error(`Failed to create query: ${err.message}`);
        throw err;
    }
}
async function revisedQuery({ with_genres, with_keywords, sort_by }) {
    if (with_keywords) {
        return {
            with_genres,
            with_keywords
        }
    }
    if (sort_by) {
        return with_genres
    }
}
async function makeRequest(queryObj) {
    return await movieDb.discoverMovie(queryObj)
        .then((movies) => {
            if (movies.results) {
                return movies.results.filter((movie, index) => {
                    return index <= 8;
                });
            }
        }).catch((err) => {
            logger.error(`Failed to make request: ${err.message}`);
            throw err;
        });
}



async function filterRequest(queryObj) {
    const movieResults = await makeRequest(queryObj)
        .then((movies) => {
            if (!movies) {
                return null;
            }
            return movies
        }).catch(err => {
            logger.error(`Failed to make request: ${err.message}`);
            throw err;
        });
    try {
        if (!movieResults) {
            return await filterRequest(await revisedQuery(queryObj));
        }
        return {
            movieResults,
            queryObj
        }
    } catch (err) {
        logger.error(`Failed to filter request: ${err.message}`);
        throw err;
    }

}

async function filterResults({ movieResults, queryObj }) {
    try {
        const movieRetun = await Promise.all(movieResults.map(async (movie) => {
            const genres = await listMatcher(movie.genre_ids);
            return ({
                movieId: movie.id,
                movieTitle: movie.title,
                movieDescription: movie.overview,
                movieReleaseYear: (movie.release_date) ? movie.release_date.split('-')[0] : undefined,
                movieGenres: genres,
                moviePopularity: movie.vote_average ? `${movie.vote_average * 10}%` : 'This movie has no votes',
                movieImagePath: movie.poster_path
            })
        }));

        return {
            movieGenerationDate: new Date().toISOString(),
            movieSearchCriteria: queryObj,
            movies: movieRetun
        };
    } catch (err) {
        logger.error(`Failed to format movies ${err}`);
        throw err;
    }
}


export async function getPlaylist(user, lastWeek, type) {
    const id = user._id;
    return (
        filterMovies(user.userMovies, lastWeek)
            .then((leaderboardObj) => normiliseData(leaderboardObj))
            .then((leaderboard) => compareData(leaderboard))
            .then((sortedData) => createQuery(sortedData))
            .then((queryObj) => filterRequest(queryObj))
            .then((results) => filterResults(results))
            .then((sortedMovies) => writeToDB(id, sortedMovies, type))
            .then((moviesWritten) => moviesWritten)
            .catch(err => {
                logger.error(err.message);
                throw err;
            }));
}



