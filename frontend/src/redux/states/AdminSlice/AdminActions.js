import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADMIN_API } from "../../../utils/data";
import { handleApiError } from "../../../utils/data";

export const forgotAdmin = createAsyncThunk(
  "forgotAdmin",
  async (adminData) => {
    try {
      const res = await ADMIN_API.post("/api/admin/forgotpassword", adminData);
      return { error: null, data: res.data };
    } catch (error) {
      return handleApiError(error);
    }
  }
);

export const resetPasswordAdmin = createAsyncThunk(
  "resetPasswordAdmin",
  async (adminData) => {
    try {
      const res = await ADMIN_API.put(`/api/admin/resetpassword/${adminData.resetToken}`, adminData.passwords);
      return { error: null, data: res.data };
    } catch (error) {
      return handleApiError(error);
    }
  }
);

export const signAdminIn = createAsyncThunk(
  "signAdminIn",
  async (adminData) => {
    try {
      const res = await ADMIN_API.post("/api/admin/login", adminData);
      return { error: null, data: res.data };
    } catch (error) {
      return handleApiError(error);
    }
  }
);

export const getAdminLoginStatus = createAsyncThunk(
  "getAdminLoginStatus",
  async () => {
    try {
      const res = await ADMIN_API.get("/api/admin/loggedin");
      return { error: null, data: res.data };
    } catch (error) {
      return handleApiError(error);
    }
  }
);

export const logAdminOut = createAsyncThunk(
  "logAdminOut",
  async () => {
    try {
      const res = await ADMIN_API.get("/api/admin/logout");
      return { error: null, data: res.data };
    } catch (error) {
      return handleApiError(error);
    }
  }
);

export const getAdmin = createAsyncThunk(
  "getAdmin",
  async () => {
    try {
      const res = await ADMIN_API.get("/api/admin/getadmin");
      return { error: null, data: res.data };
    } catch (error) {
      return handleApiError(error);
    }
  }
);
