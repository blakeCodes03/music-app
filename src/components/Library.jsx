import axios from "axios";
import React, { useEffect, useState } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SmallScreenNav from "./SmallScreenNav";
import SmScreenFooter from "./SmScreenFooter";
import Loader from "./Loader";

function Library() {
  const [
    {
      token,
      playlists,
      selectedPlaylist,
      selectedPlaylistId,
      currentPlaying,
      tracksUrlArray,
      isLoading,
    },
    dispatch,
  ] = useStateProvider();
  const [urlsArray, setUrlsArray] = useState();
  const [trackIndex, setTrackIndex] = useState(0);
  const [songurl, setSongUrl] = useState();
  const [song, setSong] = useState({
    id: null,
    name: null,
    artists: null,
    image: null,
    duration: null,
    preview_url: null,
  });
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
      dispatch({ type: reducerCases.SET_LOADING_STATE, isLoading: false });

    };
    getPlaylistData();

    const getInitialPlaylist = async () => {
      dispatch({ type: reducerCases.SET_LOADING_STATE, isLoading: true });
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
          artists: track.artists[0].name,
          image: track.album.images[0].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
          track_preview_url: track.preview_url,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
      dispatch({ type: reducerCases.SET_LOADING_STATE, isLoading: false });

      //setting selected playlist songs as local state urlsArray
      setUrlsArray(selectedPlaylist.tracks);
    };
    getInitialPlaylist();

    if (song.name != null) {
      // set global state of song anytime local state(song) changes
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: song });
    }
  }, [token, dispatch, selectedPlaylistId, song]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playSong = (track_preview_url, id, image, artists, duration, name) => {
    setSong((prevState) => ({
      ...prevState,
      preview_url: track_preview_url,
      id: id,
      image: image,
      artists: artists,
      duration: duration,
      name: name,
    }));

    try {
      if (songurl != null) {
        //on first render songurl == null; prevents error

        songurl.pause();
        songurl.load();
      }
      let newSong = new Audio(track_preview_url);
      newSong.play();
      setSongUrl(newSong);
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      dispatch({ type: reducerCases.SET_TRACK_URL, trackUrl: newSong }); // setting the same Audio instance (newSong) as trackUrl global state so that the same instace can be used to pause/play music from other pages
    } catch (error) {
      throw error;
    }
  };

  //functions to handle next/prev funtionality and is passed as props to footer components
  const handleNext = () => {
    if (trackIndex >= urlsArray.length - 1) {
      setTrackIndex(0);
    } else {
      setTrackIndex((prev) => prev + 1);
    }
    //playsong function is called with next song's details as paramters
    playSong(
      urlsArray[trackIndex].track_preview_url,
      urlsArray[trackIndex].id,
      urlsArray[trackIndex].image,
      urlsArray[trackIndex].artists,
      urlsArray[trackIndex].duration,
      urlsArray[trackIndex].name
    );
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
    } else {
      setTrackIndex((prev) => prev - 1);
    }
    //playsong function is called with next song's details as paramters
    playSong(
      urlsArray[trackIndex].track_preview_url,
      urlsArray[trackIndex].id,
      urlsArray[trackIndex].image,
      urlsArray[trackIndex].artists,
      urlsArray[trackIndex].duration,
      urlsArray[trackIndex].name
    );
  };

  return (
    <div className=" max-h-screen w-full grid grid-rows-[80vh,10vh,10vh] md:grid-rows-[85vh,15vh] relative">
      <div className="gradient-bg grid grid-cols-[100vw]  md:grid-cols-[5vw,95vw] h-full w-full ">
        <Sidebar />
        <div className="w-full h-full overflow-auto ">
          <div className="min-h-screen  md:ml-[160px] bg-gradient">
            <div className="p-5">
              <div className="flex items-end">
                <h2 className="text-black text-3xl font-bold">
                  Select Playlist:
                </h2>
              </div>

              <div className="overflow-x-auto  mt-5 space-x-5 flex">
                {playlists.map(({ name, id, images }) => (
                  <div
                    onClick={() => changeCurrentPlaylist(id)}
                    className="min-w-[150px] cursor-pointer"
                    key={id}
                  >
                    <img
                      className="w-full rounded-[25px] shadow-md"
                      src={images[0].url}
                      alt={name + `image`}
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
            {isLoading ? (
              <Loader />
            ) : (
              selectedPlaylist && (
                <div className="mt-4 mb-10 h-full bg-transparent rounded-[30px]">
                  <h1 className="mt-2 mb-1 ml-4 font-bold text-lg">
                    {selectedPlaylist.name}
                  </h1>
                  <div className="px-4 flex flex-col w-full mb-10 md:mb-24  items-center">
                    {selectedPlaylist.tracks.map(
                      (
                        {
                          id,
                          name,
                          artists,
                          image,
                          duration,
                          track_preview_url,
                        },
                        index
                      ) => (
                        <div
                          className="w-full h-[4rem] bg-white my-1 flex items-center justify-between rounded-[10px] cursor-pointer space-x-2"
                          key={id}
                          onClick={() =>
                            playSong(
                              track_preview_url,
                              id,
                              image,
                              artists,
                              duration,
                              name
                            )
                          }
                        >
                          <div className="flex items-center">
                            <p className="text-black">{index + 1}</p>
                            <img
                              className=" rounded-[8px] w-[50px] h-[50px] p-1 ml-2"
                              src={image}
                              alt={`${name} image`}
                            />
                          </div>
                          <div className=" flex flex-col max-w-[12rem] md:max-w-[20rem]">
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
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-full z-10 lg:ml-[230px]">
        {/*sending handleNext/handleprev as props to playerControls to achieve prev/next functionality */}
        <Footer
          handleNextSong={handleNext}
          handlePreviousSong={handlePrevious}
        />
        <SmScreenFooter
          handleNextSong={handleNext}
          handlePreviousSong={handlePrevious}
        />
      </div>
      <div className="block md:hidden">
        <SmallScreenNav />
      </div>
    </div>
  );
}

export default Library;
