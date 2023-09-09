import axios from "axios";
import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

function Body() {
  const [{ token, newReleases, categories, featuredPlaylist }, dispatch] = useStateProvider();
  useEffect(() => {
    const getnewReleases = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/new-releases",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const newReleases = {
        projects: response.data.albums.items.map((project) => ({
          id: project.id,
          name: project.name,
          artists: project.artists.map((artist) => artist.name),
          image: project.images[0].url,
        })),
      };
      dispatch({ type: reducerCases.SET_NEW_RELEASES, newReleases });
    };

    getnewReleases();

    const getCategories = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/categories",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const categories = {
        list: response.data.categories.items.map((category) => ({
          id: category.id,
          name: category.name,
          image: category.icons[0].url,
        })),
      };
      dispatch({ type: reducerCases.SET_CATEGORIES, categories });
    };

    getCategories();

    const getFeaturedPlaylists = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/featured-playlists",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const featuredPlaylist = {
        playlists: response.data.playlists.items.map((playlist) => ({          
          name: playlist.name,
          image: playlist.images[0].url,
        })),
      };
      dispatch({ type: reducerCases.SET_FEATURED_PLAYLISTS, featuredPlaylist });
    };

    getFeaturedPlaylists();
  }, [token]);

  return (
    <div className=" min-h-screen  md:ml-[180px] ">
      <div className="p-5">
        {newReleases && (
          <>
            <div className="flex items-end mt-10">
              <h2 className="text-black text-3xl font-bold">New Releases</h2>
              <p className="ml-5 text-base text-gray-600">- Top 20</p>
            </div>
            <div className="overflow-x-auto space-x-5 flex gap-4 p-10">
              {newReleases.projects.map(
                ({ id, name, image, artists }) => {
                  return (
                    <div
                      className="min-w-[150px] w-[150px] animate-slideup"
                      key={id}
                    >
                      <img
                        className="w-full rounded-[25px] shadow-md"
                        src={image}
                        alt={artists + ` image`}
                      />
                      <div className="px-3 py-2">
                        <p className="text-black font-bold truncate">
                          {artists}
                        </p>
                        <p className="font-medium text-black text-base truncate">
                          {name}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </>
        )}

        {categories && (
          <>
            <div className="flex items-end mt-10">
              <h2 className="text-black text-3xl font-bold">Categories</h2>
            </div>
            <div className="overflow-x-auto space-x-5 flex gap-4 p-10">
              {categories.list.map(({ name, image }, index) => {
                return (
                  <div
                    className="min-w-[150px] w-[150px] animate-slideup"
                    key={index}
                  >
                    <img
                      className="w-full rounded-[25px] shadow-md"
                      src={image}
                      alt={name + ` image`}
                    />
                    <div className="px-3 py-2">
                      <p className="text-black font-bold truncate">{name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {featuredPlaylist && (
          <>
            <div className="flex items-end mt-10 ">
              <h2 className="text-black text-3xl font-bold">Featured</h2>
            </div>
            <div className="overflow-x-auto space-x-5 flex gap-4 p-10 mb-10">
              {featuredPlaylist.playlists.map(({ name, image }, index) => {
                return (
                  <div
                    className="min-w-[150px] w-[150px] animate-slideup"
                    key={index}
                  >
                    <img
                      className="w-full rounded-[25px] shadow-md"
                      src={image}
                      alt={name + ` image`}
                    />
                    <div className="px-3 py-2">
                      <p className="text-black font-bold truncate">{name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Body;
