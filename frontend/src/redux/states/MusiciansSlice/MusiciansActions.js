import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADMIN_API } from "../../../utils/data";
import { handleApiError } from "../../../utils/data";

export const getMusicians = createAsyncThunk("getMusicians", async () => {
  try {
    const res = await ADMIN_API.get("/api/musicians");
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
});

export const getMusician = createAsyncThunk("getMusician", async (id) => {
  try {
    const res = await ADMIN_API.get(`/api/musicians/${id}`);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
});

export const createMusician = createAsyncThunk("createMusician", async (data) => {
  try {
    const res = await ADMIN_API.post(`/api/musicians/`, data);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
});

export const updateMusician = createAsyncThunk("updateMusician", async (musician) => {

  try {
    const res = await ADMIN_API.patch(`/api/musicians/${musician.id}`, musician.data);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
});

export const deleteMusician = createAsyncThunk("deleteMusician", async (id) => { 
  try {
    const res = await ADMIN_API.delete(`/api/musicians/${id}`);
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
});
