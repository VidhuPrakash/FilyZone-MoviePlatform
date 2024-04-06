import { fetchTrending } from "@/actions/movieData";
import HeroCard from "./HeroCard/HeroCard";

const Hero = async () => {
  const trending = await fetchTrending();
  const randomNumber = Math.floor(Math.random() * trending.length);
  const TrendingMovie = trending[randomNumber];
  return (
    <div>
      <HeroCard trendingMovie={TrendingMovie} />
    </div>
  );
};

export default Hero;
