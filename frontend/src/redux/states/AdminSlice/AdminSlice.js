import { createSlice } from "@reduxjs/toolkit";
import { signAdminIn } from "./AdminActions";
import { forgotAdmin } from "./AdminActions";
import { resetPasswordAdmin } from "./AdminActions";
import { getAdminLoginStatus } from "./AdminActions";
import { getAdmin } from "./AdminActions";
import { logAdminOut } from "./AdminActions";
import { toast } from "react-toastify";

const initialState = {
  data: {
    _id: "",
    token: "",
    name: "",
    email: "",
    bio: "",
    photo: "",
    phone: "",
  },
  isSignedIn: false,
};

const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signAdminIn.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(signAdminIn.fulfilled, (state, action) => {
        state.status = "Success";
        state.data = action.payload.data || null;
        state.isSignedIn = true;
        if (action.payload.data) {
          toast.success("Successful Login");
        }
      })
      .addCase(signAdminIn.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getAdminLoginStatus.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(getAdminLoginStatus.fulfilled, (state, action) => {
        state.status = "Success";
        state.isSignedIn = action.payload.data;
      })
      .addCase(getAdminLoginStatus.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(forgotAdmin.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(forgotAdmin.fulfilled, (state, action) => {
        state.status = "Success";
        toast.success(action.payload.data.message);
      })
      .addCase(forgotAdmin.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(resetPasswordAdmin.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(resetPasswordAdmin.fulfilled, (state, action) => {
        state.status = "Success";
        toast.success(action.payload.data.message);
      })
      .addCase(resetPasswordAdmin.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getAdmin.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.status = "Success";
        state.data = action.payload.data;
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(logAdminOut.pending, (state) => {
        state.status = "Loading...";
      })
      .addCase(logAdminOut.fulfilled, (state) => {
        state.status = "Success";
        state = initialState;
      })
      .addCase(logAdminOut.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
