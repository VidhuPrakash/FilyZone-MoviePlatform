"use client";
import { Genre, Movie, Video } from "@/lib/types";
import { AddCircle, CancelRounded, RemoveCircle } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface Props {
  movie: Movie;
  closeModel: () => void;
  movieId: number; // Changed to lowercase 'number'
}
interface User {
  email: string;
  username: string;
  favorites: number[];
}

const Model = ({ movie, closeModel, movieId }: Props) => {
  const router = useRouter();
  const [video, setVideo] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const { data: session } = useSession();
  const [isFav, setFav] = useState(true);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/${session?.user?.email}`);
      const data = await res.json();
      setUser(data);
      setFav(data.favorites.find((item: number) => item === movie.id));
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Can't find User");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) getUser();
  }, [session]);

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

  const handleMyList = async () => {
    try {
      const res = await fetch(`/api/user/${session?.user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: movieId }),
      });
      const data = await res.json();
      setUser(data);
      setFav(data.favorites.find((item: number) => item === movie.id));
      router.refresh();
    } catch (error) {
      console.log("Fail to handle my list :", error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
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
            {isFav ? (
              <RemoveCircle
                className="cursor-pointer text-pink-1"
                onClick={handleMyList}
              />
            ) : (
              <AddCircle
                onClick={handleMyList}
                className="cursor-pointer text-pink-1"
              />
            )}
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
