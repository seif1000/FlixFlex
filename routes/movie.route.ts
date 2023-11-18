import { Router } from "express";
import {
  addMovieToFav,
  getMovieDetails,
  getMovieTrailer,
  getMovies,
  getMyFavs,
  getSeries,
  getTopMovies,
  getTopSeries,
  searchMovies,
} from "../controllers/movie.controller";
import isAuth from "../middelware/isAuth";

const movieRouter = Router();

movieRouter.get("/get_movies", isAuth, getMovies);
movieRouter.get("/get_series", isAuth, getSeries);
movieRouter.get("/get_top_movies", isAuth, getTopMovies);
movieRouter.get("/get_top_series", isAuth, getTopSeries);
movieRouter.post("/add_remove_movie_to_fav/:movieId", isAuth, addMovieToFav);

movieRouter.get("/get_my_favs", isAuth, getMyFavs);
movieRouter.get("/search_movies", searchMovies);
movieRouter.get("/get_movie_details/:movieId", getMovieDetails);
movieRouter.get("/get_movie_trailer/:movieId", getMovieTrailer);

export { movieRouter };
