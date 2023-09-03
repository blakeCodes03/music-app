import React from "react";

export default function Login() {
  const handleClick = async () => {
    const client_id = "4567db63ed674cb1a2bd5d6f722f7227";
    const redirect_uri = "http://localhost:5173/";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
      "user-library-read",
      "user-library-modify",
      "streaming"
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
    window.history.pushState({}, null, '/');
  };
  return (
    <div className="flex justify-center items-center flex-col  h-screen w-screen gap-8 bg-[#1db954]">
      <img
        className=" h-[10vh] md:h-[20vh]"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
      />
      <button onClick={handleClick} className=" py-4 px-20  text-2xl text-[#49f585]  rounded-[5rem] cursor-pointer bg-black ">
        Connect to Spotify
      </button>
    </div>
  );
}
