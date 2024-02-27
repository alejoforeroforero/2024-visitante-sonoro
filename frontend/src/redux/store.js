import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from './states/AdminSlice/AdminSlice';
import MusiciansSlice from "./states/MusiciansSlice/MusiciansSlice";

export const store = configureStore({
    reducer: {
        adminReducer: AdminSlice,
        musiciansReducer: MusiciansSlice
    }
})