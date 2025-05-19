import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    adduser(state, action) {
      state.user.push(action.payload);
    },
    deleteuser(state, action) {
      state.user = state.user.filter((user) => user.id !== action.payload);
    },
  },
});

export const { adduser, deleteuser } = userSlice.actions;
export default userSlice.reducer;
