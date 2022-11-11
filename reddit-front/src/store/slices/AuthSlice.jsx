/* eslint-disable operator-linebreak */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * @typedef AuthState - This describes the current authentication state
 * @property {Objec} user - the current authenticated user with its
 * data like username and email and photo
 * @property {boolean} isAuth - To check if the current user is authenticated or not
 * @property {boolean} isLoading - To indicate if the current request is still pending
 * @property {string}  error - The error message that returns from rejected requests
 * @property {string}  msg - The message returns with fulfilled requests
 */

const SERVER_NAME = process.env.SERVER;
const INITIAL_STATE = {
  user: {},
  isAuth: false,
  isLoading: false,
  error: null,
  fulfilled: false,
  msg: null
};

/**
 * Send a post request to backend with the signup user data
 */
export const signUp = createAsyncThunk(
  'user/signup',
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`${SERVER_NAME}/api/auth/signup`, {
        email: user.email,
        username: user.username,
        password: user.password
      });

      const { data } = res;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

/**
 * Send a post request to backend with the login user data
 */
export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.post(`${SERVER_NAME}/api/auth/login`, {
      username: user.username,
      password: user.password
    });

    const { data } = res;

    return data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

/**
 * Send a request for backend with the signup user data
 */
export const forgetUserName = createAsyncThunk(
  'user/forgetusername',
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`${SERVER_NAME}/api/auth/forget-username`, {
        emai: user.email
      });

      const { data } = res;

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

/**
 * Send a post request for backend with the forget password data
 */
export const forgetPassword = createAsyncThunk(
  'user/forgetpassword',
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`${SERVER_NAME}/api/auth/forget-password`, {
        emai: user.email,
        username: user.username
      });

      const { data } = res;

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Send a request for backend with the reset password data
 */
export const resetPassword = createAsyncThunk(
  'user/resetpassword',
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${SERVER_NAME}/api/auth/change-forgetten-password`,
        {
          password: user.password
        }
      );

      const { data } = res;

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const AuthSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    /**
     * reset the authentication state
     * @param {Object} state
     */
    resetRequest(state) {
      state.error = null;
      state.msg = null;
      state.isAuth = false;
      state.isLoading = false;
      fulfilled = false;
    },
    /**
     * End the current session for the current user
     * @param {Object} state
     */
    logOut(state) {
      state.user = {};
      state.isAuth = false;
    }
  },
  extraReducers: {
    /** Sign up */
    [signUp.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.fulfilled = false;
    },
    [signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    [signUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    /** Login */
    [login.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.fulfilled = false;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.fulfilled = false;
      state.error = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuth = true;
      state.fulfilled = true;
      state.error = null;
    },
    /** Forget username */
    [forgetUserName.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.fulfilled = false;
    },
    [forgetUserName.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.fulfilled = false;
    },
    [forgetUserName.fulfilled]: (state) => {
      state.isLoading = false;
      state.fulfilled = true;
      state.error = null;
    },
    /** Forget Password */
    [forgetPassword.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.fulfilled = false;
    },
    [forgetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.fulfilled = false;
    },
    [forgetPassword.fulfilled]: (state) => {
      state.isLoading = false;
      state.fulfilled = true;
      state.error = null;
    },
    /** Change forgetten password */
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.fulfilled = false;
    },
    [resetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.fulfilled = false;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.msg = action.payload;
      state.error = null;
      state.fulfilled = true;
    }
  }
});

export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;
