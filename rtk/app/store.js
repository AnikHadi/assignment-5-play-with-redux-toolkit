const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
const videoReducer = require("../features/video/videoSlice");
const relatedVideoReducer = require("../features/relatedVideos/relatedVideoSlice");

const { createLogger } = require("redux-logger");

const logger = createLogger();
// create store
const store = configureStore({
  reducer: {
    video: videoReducer,
    relatedVideo: relatedVideoReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
});

module.exports = store;
