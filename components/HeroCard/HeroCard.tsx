import { baseImgUrl } from "@/lib/constent";
import { Movie } from "@/lib/types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";

const HeroCard = ({ trendingMovie }: { trendingMovie: Movie }) => {
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
        <button className="hero-btn">
          <PlayArrowIcon /> Play Now
        </button>
        <button className="hero-btn">
          <InfoTwoToneIcon /> Info
        </button>
      </div>
    </div>
  );
};

export default HeroCard;
