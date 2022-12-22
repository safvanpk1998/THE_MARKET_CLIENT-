import {
  createSlice,
  createAsyncThunk,
  combineReducers,
  createAction,
} from "@reduxjs/toolkit";
import { http, base } from "../http-common";
import qs from "qs";

const initialState = {
  products: [],
  review:[]
  // productDetails:[]
};

//create a new product

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/admin/products/new", data);
      console.log(data, "datataaa");

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//get all product
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (keyword) => {
    if(keyword){
      const response = await http.get(`/products?keyword=${keyword}`);

    return response.data;
    }
    else{
      const response = await http.get(`/products`);

      return response.data;

    }
  
  }
);

//grt product with filter

export const getfilterdProduct = createAsyncThunk(
  "product/getfilterdProduct",
  async (data) => {
    let price = [0, 100000];
    console.log(data, "sub");
    if (data.amountPayable) {
      price = data.amountPayable;
      if (price[1] == 100000) {
        price[1] = 100000;
      }
    }
    if(data.keyword){
      const response = await http.get(
     
        `/products?${data.subCategory}&${data.brand}&offer[gte]=${data.offer}&ratings[gte]=${data.ratings}&amountPayable[gte]=${price[0]}&amountPayable[lte]=${price[1]}&keyword=${data.keyword}`
      );
      return response.data;
        
    }
    if(data.soldBy){
      const response = await http.get(
     
        `/products?${data.subCategory}&${data.brand}&offer[gte]=${data.offer}&ratings[gte]=${data.ratings}&amountPayable[gte]=${price[0]}&amountPayable[lte]=${price[1]}&soldBy=${data.soldBy}`
      );
      return response.data;
        
    }
    if(data.type){
      const response = await http.get(
     
        `/products?${data.subCategory}&${data.brand}&offer[gte]=${data.offer}&ratings[gte]=${data.ratings}&amountPayable[gte]=${price[0]}&amountPayable[lte]=${price[1]}&category=${data.type}`
      );
      return response.data;
        
    }
   
  }
);

//post a review

export const createReview = createAsyncThunk(
  "product/createReview",
  async (value, { rejectWithValue }) => {
    try {
      const response = await http.put("/review", value);
      console.log(value, "datataaa");

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const clearProductError = createAction("clearProductError");

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },

    [createProduct.fulfilled]: (state, action) => {
      return {
        ...state,

        loading: false,
        products: state.products.concat(action.payload.product),
        productCount: state.productCount + 1,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    },

    [createProduct.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    //all product reducer
    [getProduct.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        products: [],
      };
    },

    [getProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    },

    [getProduct.rejected]: (state, action) => {
      console.log(action.error);
      return {
        loading: false,
        error: action.error,
      };
    },

    //filterdProduct

    [getfilterdProduct.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        productLoading: true,
        products: [],
      };
    },

    [getfilterdProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        productLoading:false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filterdProductCount,
      };
    },

    [getfilterdProduct.rejected]: (state, action) => {
      console.log(action.error);
      return {
        loading: false,
        productLoading:false,
        error: action.error,
      };
    },

    //create Review

    [createReview.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },

    [createReview.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: action.payload,
        reviewAdded:true
      };
    },

    [createReview.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
        reviewAdded:false
      };
    },
    

    [clearProductError]: (state, action) => {
      return {
        ...state,
        error: null,
        productLoading:false,
        reviewAdded:null
      };
    },
  },
});

const { reducer } = productSlice;
export default reducer;
