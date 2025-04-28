import { createSlice } from '@reduxjs/toolkit';
import { loadSDK, logout as logoutService } from '../services/authService';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  sdkLoaded: false
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
    },
    setSDKLoaded: (state, action) => {
      state.sdkLoaded = action.payload;
    }
  },
});

export const { setUser, clearUser, setLoading, setError, setSDKLoaded } = userSlice.actions;

// Initialize SDK loading
export const initializeSDK = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await loadSDK();
    dispatch(setSDKLoaded(true));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Failed to load Apper SDK:", error);
    dispatch(setError("Failed to initialize authentication"));
    dispatch(setSDKLoaded(false));
  }
};

// Enhanced logout function
export const logout = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const success = logoutService();
    if (success) {
      dispatch(clearUser());
    } else {
      dispatch(setError("Logout failed"));
    }
  } catch (error) {
    console.error("Error during logout:", error);
    dispatch(setError("Error during logout"));
  } finally {
    dispatch(setLoading(false));
  }
};

export default userSlice.reducer;