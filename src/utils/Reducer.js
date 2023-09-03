import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  userInfo: null,
  playlists: [],
  currentPlaying: null,
  playerState: false,
  selectedPlaylist: null,
  selectedPlaylistId: "",
  currentPage: 1,
  newReleases: null,
  categories: null,
  featuredPlaylist: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case reducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };
    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case reducerCases.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
      case reducerCases.SET_NEW_RELEASES:
      return {
        ...state,
        newReleases: action.newReleases,
      };
      case reducerCases.SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
      case reducerCases.SET_FEATURED_PLAYLISTS:
      return {
        ...state,
        featuredPlaylist: action.featuredPlaylist,
      };
      
    default:
      return state;
  }
};

export default reducer;
