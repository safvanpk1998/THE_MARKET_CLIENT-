import {
  createSlice,
  createAsyncThunk,
  combineReducers,
  createAction
} from "@reduxjs/toolkit";
import { http, base } from "../http-common";

const initialState = {
  productDetails: [],
  reviewDetails:[]
};
export const getProductDeatails = createAsyncThunk(
  "product/getProductDeatails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.get(`/product/${id}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);




//get review

export const getReview = createAsyncThunk(
  "product/getReview",
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.get(`/reviews?id=${id}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const clearAllError = createAction("clearAllError");

const productDetailSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    //productdetailsreducer

    [getProductDeatails.pending]: (state, action) => {
      return {
        loading: true,
        details:true,
        ...state,
      };
    },

    [getProductDeatails.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        details:false,
        productDetails: action.payload,
        singleProduct:true
      };
    },

    [getProductDeatails.rejected]: (state, action) => {
      console.log(action.error);
      return {
        loading: false,
        details:false,
        error: action.error,
      };
    },


    //get review 

    [getReview.pending]: (state, action) => {
      return {
        loading: true,
        ...state,
      };
    },

    [getReview.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        reviewDetails: action.payload,
      };
    },

    [getReview.rejected]: (state, action) => {
      console.log(action.error);
      return {
        loading: false,
        error: action.error,
      };
    },
    [clearAllError]: (state, action) => {
      return {
        ...state,
        error: null,
        details:false
      };
    },
  },
});

const { reducer } = productDetailSlice;
export default reducer;
