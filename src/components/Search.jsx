import axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SmallScreenNav from "./SmallScreenNav";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { FiGrid, FiSearch } from "react-icons/fi";
import SmScreenFooter from "./SmScreenFooter";
import { Bars } from "react-loader-spinner";
import Loader from "./Loader";

function Search() {
  const [{ token, searchResults, currentPlaying, isLoading }, dispatch] =
    useStateProvider();
  const [searchInput, setSearchInput] = useState("");
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
    if (song.name != null) {
      // set global state of song anytime local state(song) changes
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: song });
    }
  }, [song]);

  const handleSubmit = async () => {
    dispatch({ type: reducerCases.SET_LOADING_STATE, isLoading: true });
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=track`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      const searchResults = {
        results: response.data.tracks.items.map((result) => ({
          id: result.id,
          name: result.album.name,
          artists: result.artists[0].name,
          image: result.album.images[0].url,
          track_preview_url: result.preview_url,
          duration: result.duration_ms,
        })),
      };
      dispatch({ type: reducerCases.SET_SEARCH_RESULTS, searchResults });
      //setting selected playlist songs as local state urlsArray
      setUrlsArray(searchResults.results);
      dispatch({ type: reducerCases.SET_LOADING_STATE, isLoading: false });
    } else {
      console.log("no response");
    }
  };

  function handleChange(e) {
    setSearchInput(e.target.value);
  }

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
      dispatch({ type: reducerCases.SET_TRACK_URL, trackUrl: newSong });
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
    <div className=" max-h-screen max-w-full overflow-hidden grid grid-rows-[80vh,10vh,10vh] md:grid-rows-[85vh,15vh] relative">
      <div className="gradient-bg grid grid-cols-[100vw]  md:grid-cols-[5vw,95vw] h-full w-full">
        <Sidebar />
        <div className="w-full h-full overflow-auto">
          <div className=" min-h-screen  md:ml-[160px] bg-gradient">
            <div className="max-w-md mx-auto flex mt-10 p-4">
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <FiSearch className="ml-1" size={20} />
                </div>

                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  placeholder="Search something.."
                  onChange={handleChange}
                  value={searchInput}
                  name="search"
                />
              </div>
              <div>
                <button
                  className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleSubmit()}
                >
                  <FiSearch className="ml-1" size={30} />
                </button>
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              searchResults && (
                <div className="px-4 flex flex-col w-full   items-center">
                  {searchResults.results.map(
                    ({
                      id,
                      name,
                      artists,
                      image,
                      duration,
                      track_preview_url,
                    }) => (
                      <div
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
                        className="w-full h-[4rem] bg-white my-1 flex items-center justify-between rounded-[10px] cursor-pointer  space-x-2"
                        key={id}
                      >
                        <div className="flex items-center">
                          <img
                            className=" rounded-[8px] w-[50px] h-[50px] p-1"
                            src={image}
                            alt={`${name} image`}
                          />
                        </div>
                        <div className="text-center  hidden md:flex font-bold text-black md:w-[8rem] truncate">
                          {name}
                        </div>
                        <div className="text-center hidden md:flex font-normal text-sm text-black md:w-[8rem]  truncate">
                          {artists}
                        </div>
                        {/* //for small screen */}
                        <div className=" flex flex-col max-w-[15rem] md:hidden md:flex-row  md:w-[25rem]">
                          <div className="text-center  font-bold text-black truncate">
                            {name}
                          </div>
                          <div className="text-center font-normal text-sm text-black max-w-[12rem] md:w-[25rem] truncate">
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
              )
            )}
          </div>
        </div>
      </div>

      <div className="w-full  h-full z-10 md:ml-[230px]">
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

export default Search;
