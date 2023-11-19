import { Request, Response } from "express";
import axiosInstance from "../config/AxiosInstance";
import { User } from "../models/User";

/// The TMDB api does not provide option to set the btach size
export const getMovies = async (
  req: Request<{}, {}, {}, { page: string }>,
  res: Response
) => {
  try {
    const { page } = req.query;

    const response = await axiosInstance.get(
      `discover/movie?language=en-US&page=${page}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Somthing went wrong!" });
  }
};

/// The TMDB api does not provide option to set the btach size
export const getSeries = async (
  req: Request<{}, {}, {}, { page: string }>,
  res: Response
) => {
  try {
    const { page } = req.query;

    const response = await axiosInstance.get(
      `discover/tv?language=en-US&page=${page}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Somthing went wrong!" });
  }
};

export const getTopMovies = async (req: Request, res: Response) => {
  try {
    const response = await axiosInstance.get(
      `movie/top_rated?language=en-US&page=1`
    );
    const topFive = response.data.results.slice(0, 5);

    res.status(200).json(topFive);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Somthing went wrong!" });
  }
};

export const getTopSeries = async (req: Request, res: Response) => {
  try {
    const response = await axiosInstance.get(
      `tv/top_rated?language=en-US&page=1`
    );
    const topFive = response.data.results.slice(0, 5);

    res.status(200).json(topFive);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Somthing went wrong!" });
  }
};

export const addMovieToFav = async (
  req: Request<{ movieId: string }, {}, {}, { type: string }>,
  res: Response
) => {
  try {
    const { authUser } = req;
    const { movieId } = req.params;
    const { type } = req.query;

    if (authUser.favs.find((item) => item.id == movieId)) {
      await User.findByIdAndUpdate(
        authUser._id,
        {
          $pull: { favs: { id: movieId, type: type } },
        },
        { new: true }
      );
      res.status(200).json({ text: `${movieId} removed from favs` });
    } else {
      await User.findByIdAndUpdate(
        authUser._id,
        {
          $push: { favs: { id: movieId, type: type } },
        },
        { new: true }
      );
      res.status(200).json({ text: `${movieId} added to favs` });
    }
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong!" });
  }
};

export const getMyFavs = async (req: Request, res: Response) => {
  try {
    const { authUser } = req;
    const favs = authUser.favs;

    const favsMovies = await Promise.all(
      favs.map(async (item) => {
        const response = await axiosInstance.get(`${item.type}/${item.id}`);
        return response.data;
      })
    );
    res.status(200).json(favsMovies);
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong!" });
  }
};

export const searchMovies = async (
  req: Request<{}, {}, {}, { type: string; page: string; searchQuery: string }>,
  res: Response
) => {
  try {
    const { searchQuery, page, type } = req.query;
    const response = await axiosInstance.get(
      `search/${type}?query=${searchQuery}&page=${page}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong!" });
  }
};
export const getMovieDetails = async (
  req: Request<{ movieId: string }, {}, {}, { type: string }>,
  res: Response
) => {
  try {
    const { type } = req.query;
    const { movieId } = req.params;
    const response = await axiosInstance.get(`${type}/${movieId}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong!" });
  }
};

export const getMovieTrailer = async (
  req: Request<{ movieId: string }, {}, {}, { type: string }>,
  res: Response
) => {
  try {
    const { type } = req.query;
    const { movieId } = req.params;

    const response = await axiosInstance.get(
      `${type}/${movieId}/videos?language=en-US`
    );
    const trialer = response.data.results.find(
      (item: any) =>
        item.type === "Trailer" &&
        item.site === "YouTube" &&
        item.official === true
    );
    if (trialer) {
      const trailerKey = `https://www.youtube.com/watch?v=${trialer.key}`;
      res.status(200).json(trailerKey);
    } else {
      res.status(200).json("No trailer found");
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Somthing went wrong!" });
  }
};
