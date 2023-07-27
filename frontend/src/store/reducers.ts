import { authState } from "@/features/auth";
import { API } from "@/services/api";

export const Reducers = {
  [API.reducerPath]: API.reducer,
  auth: authState,
};
