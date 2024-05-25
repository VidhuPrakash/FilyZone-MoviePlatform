import { fetchMovieDetails } from "@/actions/movieData";
import { fetchMyList } from "@/actions/user";
import MovieCard from "@/components/MovieCard/MovieCard";
import NavBar from "@/components/NavBar";
import { Movie } from "@/lib/types";

const MyList = async () => {
  const myList = await fetchMyList();

  const myListDetails = await Promise.all(
    myList.map(async (movieId: number) => {
      const movieDetails = await fetchMovieDetails(movieId);
      return movieDetails;
    })
  );
  return (
    <div>
      <NavBar />
      <div className="list">
        {myListDetails.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MyList;
