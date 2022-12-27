import {
  createSlice,
  createAsyncThunk,
  createAction,
  combineReducers,
} from "@reduxjs/toolkit";
import { http, base } from "../http-common";

const initialState = {
  stocker: [],
};


export const getStockersList = createAsyncThunk(
  "/stocker/allstocker",
  async () => {
    try {
      const response = await http.get("/stocker/allstocker");
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const clearWishListError = createAction("clearWishListError");

const stockerSlice = createSlice({
  name: "Stocker",
  initialState,
  extraReducers: {
    //my getMyWishList

    [getStockersList.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [getStockersList.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        stocker: action.payload,
      };
    },
    [getStockersList.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    },
  },
});
const { reducer } = stockerSlice;
export default reducer;
