import { configureStore } from "@reduxjs/toolkit";
import LoggedUsers from "../reducers/LoggedUsers";

export const store = configureStore({
  reducer: {
    loggedUsers: LoggedUsers
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch