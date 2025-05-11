import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import robotReducer from "../features/robotSlice.js";
import messageReducer from "../features/messageSlice.js";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        robot: robotReducer,
        message: messageReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }).concat(apiSlice.middleware),
    devTools: false,
});

setupListeners(store.dispatch);
export default store;
