import {
  createSlice,
  createAsyncThunk,
  combineReducers,
  createAction,
} from "@reduxjs/toolkit";
import { http, base } from "../http-common";

const initialState = {
  admin: [],
};


//get all product
export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
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
//get all product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data) => {

    const response = await http.put(`/admin/product/${data.id}`, data);

    return response.data;
  }
);

//delete product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const response = await http.delete(`/admin/product/${id}`);

    return response.data;
  }
);

//get all user Details

export const getAllUserData = createAsyncThunk(
  "product/getAllUserData",
  async () => {
    const response = await http.get(`/admin/users`);

    return response.data;
  }
);


//get all order Details

export const getAllOrderData = createAsyncThunk(
  "product/getAllOrderData",
  async () => {
    const response = await http.get(`/admin/allOrders`);

    return response.data;
  }
);


//update user role

export const updateUserRole = createAsyncThunk(
  "product/updateUserRole",
  async (data) => {
    const response = await http.put(`/admin/user/${data.id}`,data);

    return response.data;
  }
);

////delete user 

export const deleteUser = createAsyncThunk(
  "product/deleteuser",
  async (id) => {
    const response = await http.delete(`/admin/user/${id}`);

    return response.data;
  }
);

export const deleteOrder = createAsyncThunk(
  "product/deleteOrder",
  async (id) => {
    const response = await http.delete(`/order/${id}`);

    return response.data;
  }
);

//update Order Status

export const updateOrderStatus = createAsyncThunk(
  "product/updateOrderStatus",
  async (data) => {
    const response = await http.put(`/order/${data.id}`,data);

    return response.data;
  }
);
export const clearAdminError = createAction("clearAdminError");



const adminSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {



    //all product reducer
    [getAllProduct.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        products: [],
      };
    },

    [getAllProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    },

    [getAllProduct.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.error,
      };
    },
    //upadate Product

    [updateProduct.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        products: [],
      };
    },

    [updateProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
        isproductUpdated:true
      };
    },

    [updateProduct.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.error,
        isproductUpdated:false
      };
    },

    //delete Product

    [deleteProduct.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        message: false,
        products: null,
      };
    },

    [deleteProduct.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    },

    [deleteProduct.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.error,
      };
    },

     //get all user data

     [getAllUserData.pending]: (state, action) => {
      return {
        ...state,
        loading: true,

        error: null,
      };
    },

    [getAllUserData.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: true,

        usersdata: action.payload,
        error: null,
        loginError: null,
      };
    },

    [getAllUserData.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,

        error: action.payload,
      };
    },


    //update user role

     [updateUserRole.pending]: (state, action) => {
      return {
        ...state,
        loading: true,

        error: null,
      };
    },

    [updateUserRole.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: true,
        userRole:action.payload,
        userroleUpdated:true
    
      };
    },

    [updateUserRole.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,

        error: action.payload,
        userroleUpdated:false
      };
    },
     //delete user

   [deleteUser.pending]: (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },

  [deleteUser.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: false,
      userDeleted: action.payload,
      isuserDeleted:true 
    };
  },

  [deleteUser.rejected]: (state, action) => {
    return {
      loading: false,
      error: action.error,
      isuserDeleted:false
    };


    
  },

   //get all order data

   [getAllOrderData.pending]: (state, action) => {
    return {
      ...state,
      loading: true,

      error: null,
      isuserDeleted:null,
    };
  },

  [getAllOrderData.fulfilled]: (state, action) => {
    return {
      ...state,
      loading: true,

      orderdata: action.payload,
      error: null,

 
    };
  },

  [getAllOrderData.rejected]: (state, action) => {
    return {
      ...state,
      loading: false,

      error: action.payload,
    };
  },

     //delete order

     [deleteOrder.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
  
    [deleteOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        orderDeleted: action.payload,
        isOrderDeleted:true
      };
    },
  
    [deleteOrder.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.error,
        isOrderDeleted:false
      };
  
  
      
    },

    // //update order status

     [updateOrderStatus.pending]: (state, action) => {
      return {
        ...state,
        loading: true,

        error: null,
      };
    },

    [updateOrderStatus.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: true,
        orderStatus:action.payload,
        isOrderUpdated:true
    
      };
    },

    [updateOrderStatus.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        isOrderUpdated:false,

        error: action.payload,
      };
    },
    [clearAdminError]: (state, action) => {
      return {
        ...state,
        error: null,
        userroleUpdated:null,
        isuserDeleted:null,
        isproductUpdated:null,
        isOrderDeleted:null,
        isOrderUpdated:null,
      };
    },
  },

  

 
});

const { reducer } = adminSlice;
export default reducer;
