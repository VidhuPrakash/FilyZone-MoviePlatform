
import { Video } from '@/lib/types';
export const getMovieDetails = async (movieId: any) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}?append_to_response=videos`,
      options
    );
    const data = await res.json();

    const video = data?.videos?.results?.find((Video:Video) => video.type === "Trailer")?.key;
    const genres = data?.genres ?? [];

    return { video, genres };
  } catch (err) {
    console.log("Error fetching movie details", err);
    return { video: "", genres: [] };
  }
};
