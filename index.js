const store = require("./rtk/app/store");
require("util").inspect.defaultOptions.depth = null;

const {
  fetchRelatedVideo,
} = require("./rtk/features/relatedVideos/relatedVideoSlice");
const { fetchVideo } = require("./rtk/features/video/videoSlice");

// subscribe to store
store.subscribe(() => {});

store.dispatch(fetchVideo()).then((result) => {
  if (result.payload) {
    store.dispatch(fetchRelatedVideo(result.payload.tags));
  }
});
