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
  removeMovieFromFav,
  searchMovies,
} from "../controllers/movie.controller";

const movieRouter = Router();

movieRouter.get("/get_movies", getMovies);
movieRouter.get("/get_series", getSeries);
movieRouter.get("/get_top_moviee", getTopMovies);
movieRouter.get("/get_top_series", getTopSeries);
movieRouter.post("/add_movie_to_fav", addMovieToFav);
movieRouter.put("/remove_movie_from_fav", removeMovieFromFav);
movieRouter.get("/get_my_favs", getMyFavs);
movieRouter.get("/search_movies", searchMovies);
movieRouter.get("/get_movie_details/:id", getMovieDetails);
movieRouter.get("/get_movie_trailer/:id", getMovieTrailer);

export { movieRouter };
