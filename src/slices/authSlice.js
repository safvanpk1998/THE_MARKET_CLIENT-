import {
  createSlice,
  createAsyncThunk,
  createAction,
  combineReducers,
} from "@reduxjs/toolkit";
import { http, base } from "../http-common";

const initialState = {
  user: [],
};

//register new user

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("register", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//login User

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("login", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//loadUser

export const loadUser = createAsyncThunk("user/loadUser", async () => {
  try {
    const response = await http.get("userDeatils");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

//logout
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    const response = await http.get("logout");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

//reset Password

export const postResetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.put("password/reset", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//getOtp

export const getPasswordResettingOtp = createAsyncThunk(
  "user/getPasswordResettingOtp",
  async (email) => {
    try {
      const response = await http.post("password/forgot", email);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

//confirm Otp

export const postConfirmOtp = createAsyncThunk(
  "user/confirmOtp",
  async (data) => {
    try {
      const response = await http.post("/password/confirmOtp", data);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);


export const clearAuthError = createAction("clearAuthError");

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    [createUser.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    },

    [createUser.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    },

    [createUser.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    },

    //login user

    [loginUser.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        error: null,
        loginError: null,
        reset: false,
      };
    },

    [loginUser.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
        user: action.payload,
        error: null,
        loginError: null,
        reset: false,
      };
    },

    [loginUser.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        loginError: action.payload,
        reset: false,
      };
    },

    //load user

    [loadUser.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        // isAuthenticated: false,
        error: null,
        reset: false,
      };
    },

    [loadUser.fulfilled]: (state, action) => {
      if (action.payload.success == true) {
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload.user,
          error: null,
          ordercount: action.payload.ordercount,
          Wishlistcount: action.payload.Wishlistcount,
        };
      } else {
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          error: action.payload.message,
          user: null,
        };
      }
    },

    [loadUser.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    },

    //logout user

    [logoutUser.fulfilled]: (state, action) => {
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
        error: null,
        reset: false,
      };
    },

    [logoutUser.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    //get Otp

    [getPasswordResettingOtp.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        // isAuthenticated: false,
      };
    },

    [getPasswordResettingOtp.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: true,
        // isAuthenticated: false,
        user: action.payload,
        error: null,
        reset: true,
      };
    },

    [getPasswordResettingOtp.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        // isAuthenticated: false,
        // user: null,
        loginError: action.payload,
      };
    },

    //confirm Otp

    [postConfirmOtp.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        // isAuthenticated: false,
      };
    },

    [postConfirmOtp.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: true,
        user: action.payload,
        error: null,
        reset: "confirmed",
      };
    },

    [postConfirmOtp.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        loginError: action.payload,
      };
    },

    [clearAuthError]: (state, action) => {
      return {
        ...state,
        error: null,
      };
    },

    //resetPassword
    //login user

    [postResetPassword.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        error: null,
        loginError: action.payload,
      };
    },

    [postResetPassword.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
        user: action.payload,
        error: null,
        loginError: null,
        reset: "success",
      };
    },

    [postResetPassword.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        reset: "rejected",
        error: action.payload,
      };
    },

   
  },
});
const { reducer } = userSlice;
export default reducer;
