import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateUserStoryViewedState: (state, action) => {
      const { userId, storyId, viewed, viewedAt } = action.payload;
      const userIndex = state.users.findIndex((user) => user.userId === userId);
      const storyIndex = state.users[userIndex].stories.findIndex(
        (story) => story.id === storyId
      );
      state.users[userIndex].stories[storyIndex].viewed = viewed;
      state.users[userIndex].stories[storyIndex].viewedAt = viewedAt;
    },
  },
});

const { actions, reducer } = userSlice;

export const { setUsers, setError, setLoading, updateUserStoryViewedState } =
  actions;

export default reducer;
