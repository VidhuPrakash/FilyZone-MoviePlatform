"use client";
import { baseImgUrl } from "@/lib/constent";
import { Movie } from "@/lib/types";
import { useState } from "react";
import Model from "../MovieModel/Model";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [showModel, setShowModel] = useState<boolean>(false);
  const openModel = () => setShowModel(true);

  const closeModel = () => setShowModel(false);

  return (
    <>
      {" "}
      <div className="movie-card" onClick={openModel}>
        <img
          src={`${baseImgUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.name}
          className="thumbnail"
        />
        <div className="border"></div>
      </div>
      {showModel && (
        <Model movieId={movie.id} movie={movie} closeModel={closeModel} />
      )}
    </>
  );
};

export default MovieCard;
