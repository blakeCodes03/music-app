import axios from "axios";
import React, { useEffect } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SmallScreenNav from "./SmallScreenNav";

function Library() {
  const [{ token, playlists, selectedPlaylist, selectedPlaylistId }, dispatch] =
    useStateProvider();
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id, images }) => {
        return { name, id, images };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();

    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
          track_preview_url: track.preview_url,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  

  return (
    <div className=" max-h-screen w-full grid grid-rows-[80vh,10vh,10vh] md:grid-rows-[85vh,15vh] relative">
      <div className="gradient-bg grid grid-cols-[100vw]  md:grid-cols-[5vw,95vw] h-full w-full">
        <Sidebar />
        <div className="w-full h-full overflow-auto">
          <div className="min-h-screen  md:ml-[160px] bg-gradient">
            <div className="p-5">
              <div className="flex items-end">
                <h2 className="text-black text-3xl font-bold">Playlists</h2>
              </div>

              <div className="overflow-x-auto  mt-5 space-x-5 flex">
                {playlists.map(({ name, id, images }) => (
                  <div
                    onClick={() => changeCurrentPlaylist(id)}
                    className="min-w-[150px]"
                    key={id}
                  >
                    <img
                      className="w-full rounded-[25px] shadow-md"
                      src={images[0].url}
                      alt={name}
                    />
                    <div className="px-3 py-2">
                      <p className="text-black font-bold text-sm truncate">
                        {name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedPlaylist &&
            <div className="mt-4 mb-10 h-full bg-transparent rounded-[30px]">
            <h1 className="mt-2 mb-1 ml-4 font-bold text-lg">{selectedPlaylist.name}</h1>
              <div className="px-4 flex flex-col w-full   items-center">
                {selectedPlaylist.tracks.map(
                  (
                    {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                    track_preview_url,
                  },
                  index) => (
                  <div
                    className="w-full h-[4rem] bg-white my-1 flex items-center justify-between rounded-[10px]  space-x-2"
                    key={id}
                  >
                    <div className="flex items-center">
                      <p className="text-black">{index + 1}</p>
                      <img
                        className=" rounded-[8px] w-[50px] h-[50px] p-1 ml-2"
                        src={image}
                        alt={`${name} image`}
                      />
                    </div>
                    <div className=" flex flex-col max-w-[15rem] md:max-w-[20rem]">
                    <div className="text-center font-bold text-black truncate">
                      {name}
                    </div>
                    <div className="text-center font-normal text-sm text-black truncate">
                      {artists}
                    </div>
                    </div>
                    <div className="text-center font-bold text-black pr-4">
                    <span>{msToMinutesAndSeconds(duration)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            }
          </div>
        </div>
      </div>
      <div className="w-full h-full z-10 lg:ml-[230px]">
        <Footer />
      </div>
      <div className="block md:hidden">
        <SmallScreenNav />
      </div>
    </div>
  );
}

export default Library;