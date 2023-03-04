const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initialize state
const initialState = {
  loading: false,
  videos: [],
  error: "",
};

//create async thunk
const fetchRelatedVideo = createAsyncThunk(
  "relatedVideo/fetchRelatedVideo",
  async (tags) => {
    let url = "http://localhost:9000/videos?";
    for (let x of tags) {
      url += `tags_like=${x}&`;
    }
    const response = await fetch(url.slice(0, -1));
    const videos = await response.json();
    videos.sort(
      (a, b) => Number(b.views.slice(0, -1)) - Number(a.views.slice(0, -1))
    );
    return videos;
  }
);

//  fetch video reducer
const relatedVideoSlice = createSlice({
  name: "relatedVideo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedVideo.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchRelatedVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRelatedVideo.rejected, (state, action) => {
      state.loading = false;
      state.videos = [];
      state.error = action.error.message;
    });
  },
});

module.exports = relatedVideoSlice.reducer;
module.exports.fetchRelatedVideo = fetchRelatedVideo;
