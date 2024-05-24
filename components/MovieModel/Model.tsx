"use client";
import { Genre, Movie, Video } from "@/lib/types";
import { AddCircle, CancelRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface Props {
  movie: Movie;
  closeModel: () => void;
  movieId: number; // Changed to lowercase 'number'
}

const Model = ({ movie, closeModel, movieId }: Props) => {
  const [video, setVideo] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  const getMovieDetails = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movie/${movie.id}?append_to_response=videos`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.videos) {
          const index = data.videos.results.findIndex(
            (video: Video) => video.type === "Trailer"
          );
          setVideo(data.videos.results[index].key);
        }

        if (data?.genres) {
          setGenres(data.genres);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie details", error);
      });
  };

  useEffect(() => {
    getMovieDetails();
  }, [movieId]);

  return (
    <div className="modal">
      <button className="model-close" onClick={closeModel}>
        <CancelRounded
          sx={{ color: "white", fontSize: "35px", ":hover": { color: "red" } }}
        />
      </button>
      <iframe
        src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`}
        allowFullScreen
        className="modal-video"
        loading="lazy"
      />
      <div className="modal-content">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="text-base-bold">Name:</p>
            <p className="text-base-light">{movie?.title || movie?.name}</p>
          </div>
          <div className="flex gap-3">
            <p className="text-base-bold">Add To List</p>
            <AddCircle className="cursor-pointer text-pink-1" />
          </div>
        </div>
        <div className="flex gap-2">
          <p className="text-base-bold">Release Date::</p>
          <p className="text-base-light">{movie?.release_date}</p>
        </div>
        <p className="text-base-light">{movie?.overview}</p>
        <div className="flex gap-2">
          <p className="text-base-bold">Rating:</p>
          <p className="text-base-light">{movie?.vote_average}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-base-bold">Genres:</p>
          <p className="text-base-light">
            {genres.map((genres) => genres.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Model;
