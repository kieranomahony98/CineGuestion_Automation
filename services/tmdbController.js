import { formatDiagnostic } from "typescript";
import { MovieDb } from 'moviedb-promise';
import config from 'config';

export default new MovieDb(config.get('TMDB3'));
