const movieGenreOBJ = {
    '37': 'Western',
    '28': 'Action',
    '12': 'Adventure',
    '16': 'Animation',
    '35': 'Comedy',
    '80': 'Crime',
    '99': 'Documentary',
    '18': 'Drama',
    '10751': 'Family',
    '14': 'Fantasy',
    '36': 'History',
    '27': 'Horror',
    '10402': 'Music',
    '9648': 'Mystery',
    '10749': 'Romance',
    '878': 'Sci-Fi',
    '10770': 'TV Movie',
    '53': 'Thriller',
    '10752': 'War'
}

export const matchedGenres = {
    '28': ['18', '12', '53'],
    '12': ['10752', '80', '10749'],
    '16': ['35', '28', '18'],
    '35': ['53', '10751', '18'],
    '37': ['28', '12', '10752'],
    '80': ['28', '53', '35'],
    '99': ['36', '12', '10751'],
    '18': ['80', '9648', '10752'],
    '10751': ['16', '35', '10749'],
    '14': ['12', '16'],
    '36': ['99', '10752', '28'],
    '27': ['14', '878', '53'],
    '9648': ['18', '80', '28'],
    '10749': ['35', '10751'],
    '878': ['53', '12'],
    '53': ['28', '9648'],
    '10752': ['37', '28', '53']
}

export async function listMatcher(movieGenres) {
    if (!movieGenres) {
        return '';
    }
    const genres = movieGenres.toString().split(",");
    return genreMatcher(genres);
}

export async function stringMatcher(movieGenres) {
    if (!movieGenres) {
        return 'All Genres'
    };

    const genres = movieGenres.split(",");
    return genreMatcher(genres);

}

function genreMatcher(genres) {
    let returnGenres = '';
    for (const genre of genres) {
        returnGenres += movieGenreOBJ[genre] ? (returnGenres.length === 0) ? `${movieGenreOBJ[genre]}` : `, ${movieGenreOBJ[genre]}` : null;
    }
    return returnGenres;
}
