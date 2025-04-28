import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export const logout = () => async (dispatch) => {
  try {
    const { ApperUI } = window.ApperSDK;
    ApperUI.logout();
    dispatch(clearUser());
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export default userSlice.reducer;