"use client";
import { baseImgUrl } from "@/lib/constent";
import { Movie } from "@/lib/types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import { useState } from "react";
import Model from "../MovieModel/Model";

const HeroCard = ({ trendingMovie }: { trendingMovie: Movie }) => {
  const [showModel, setShowModel] = useState(false);

  const openModel = () => setShowModel(true);
  const closeModel = () => setShowModel(false);

  return (
    <div className="hero">
      <div className="hero-bg">
        <img
          src={`${baseImgUrl}${
            trendingMovie?.backdrop_path || trendingMovie?.poster_path
          }`}
          alt="TrendingMovie"
          className="hero-bg-image"
        />
        <div className="overlay"></div>
      </div>
      <h1 className="hero-title">
        {trendingMovie?.title || trendingMovie?.poster_path}
      </h1>
      <p className="hero-overview">{trendingMovie?.overview}</p>
      <div className="hero-btns">
        <button className="hero-btn" onClick={openModel}>
          <PlayArrowIcon /> Play Now
        </button>
        <button className="hero-btn" onClick={openModel}>
          <InfoTwoToneIcon /> Info
        </button>
      </div>
      {showModel && (
        <Model movie={trendingMovie} closeModel={closeModel} movieId={0} />
      )}
    </div>
  );
};

export default HeroCard;
