import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { Reducers } from "./reducers";
// import { API } from "@/services/api";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: Reducers,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(API.middleware),
    // ...options,
  });

export const Store = createStore();

export type RootState = ReturnType<(typeof Store)["getState"]>;
export type AppDispatch = (typeof Store)["dispatch"];

// useAppDispatch normal useDispatch with typescript types
export const useAppDispatch: () => AppDispatch = useDispatch;
// useTypedSelector normal useSelector with typescript types
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
