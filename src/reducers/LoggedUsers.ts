import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoggedUser } from "../interfaces/LoggedUser"

const initialState: LoggedUser[] = []

export const LoggedUsers = createSlice({
  name: "loggedusers",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<LoggedUser>) => {
      state.push(action.payload)
    },
    removeUser: (state, action: PayloadAction<LoggedUser>) => {
      state.splice(state.indexOf(action.payload), 1)
    },
  },
})

export const { addUser, removeUser } = LoggedUsers.actions
export default LoggedUsers.reducer
