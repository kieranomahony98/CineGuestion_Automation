import { MovieDb } from 'moviedb-promise';
import config from 'config';
import dotenv from 'dotenv';
dotenv.config();

export default new MovieDb(process.env.TMDB3);
