const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initialize state
const initialState = {
  loading: false,
  video: {},
  error: "",
};

//create async thunk
const fetchVideo = createAsyncThunk("video/fetchVideo", async () => {
  const response = await fetch("http://localhost:9000/videos");
  const video = await response.json();
  return video;
});

//  fetch video reducer
const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideo.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.video = action.payload;
      state.error = "";
    });
    builder.addCase(fetchVideo.rejected, (state, action) => {
      state.loading = false;
      state.video = {};
      state.error = action.payload.message;
    });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;
