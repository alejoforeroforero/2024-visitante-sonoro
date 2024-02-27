import { createSlice } from "@reduxjs/toolkit";
import { getMusicians } from "./MusiciansActions";
import { getMusician } from "./MusiciansActions";
import { deleteMusician } from "./MusiciansActions";
import { createMusician } from "./MusiciansActions";
import { updateMusician } from "./MusiciansActions";
import { toast } from "react-toastify";

const musicianInitialState = {
  id:0,
  name:'',
  age:'',
  description:'',
  image:'',
  imagePreview:''
}

const initialState = {
  musicians: [],
  musician:musicianInitialState
};

const musiciansSlice = createSlice({
  name: "Musicians",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMusicians.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(getMusicians.fulfilled, (state, action) => {
        state.status = "Success";
        state.musician = musicianInitialState;
        state.musicians = action.payload.data;
      })
      .addCase(getMusicians.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getMusician.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(getMusician.fulfilled, (state, action) => {
        state.status = "Success";
        state.musician = action.payload.data;
      })
      .addCase(getMusician.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(deleteMusician.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(deleteMusician.fulfilled, (state, action) => {
        state.status = "Success";
        state.musicians = [];
        if (action.payload.data) {
          toast.success(action.payload.data.message);
        }
      })
      .addCase(deleteMusician.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(createMusician.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(createMusician.fulfilled, (state, action) => {
        state.status = "Success";
        if (action.payload.data) {
          toast.success(action.payload.data.message);
        }
      })
      .addCase(createMusician.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(updateMusician.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(updateMusician.fulfilled, (state, action) => {
        state.status = "Success";
        state.musicians = [];

        if (action.payload.data) {
          toast.success('Músico actualizado');
        }
      })
      .addCase(updateMusician.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
  },
});

export default musiciansSlice.reducer;
