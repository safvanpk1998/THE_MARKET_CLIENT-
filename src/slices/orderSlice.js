
import {
    createSlice,
    createAsyncThunk,
    createAction,
    combineReducers,
  } from "@reduxjs/toolkit";
  import { http, base } from "../http-common";
  
  const initialState = {
    order: [],
    myOrder:[],
    singleOrder:[]
  };

  //create Order

export const createOrder=createAsyncThunk(
    "order/createOrder",
    async(data,{rejectWithValue})=>{
        try{
            const response=await http.post("/order/new",data)
            return response.data

        }
        catch(err){
            return rejectWithValue(err.response.data)

        }
    }
)

export const getMyOders=createAsyncThunk(
    "order/myorder",
    async()=>{
    
    try{
        const response=await http.get("/order/myorders")
        return response.data
    }
    catch(err){
        return (err.response.data)

    }}
)

export const getSingleOrder=createAsyncThunk(
    "order/singleOrder",
    async(id)=>{
        try {
            const response=await http.get(`/order/${id}`)
            return response.data
            
        } catch (err) {
            return (err.response.data)
            
        }

    }
)

//update order

// export const updateOrders=createAsyncThunk(
//     "order/updateOrder",
//     async(data)=>{
    
//     try{
//         const response=await http.put(`/order/${data.id}`,data)
//         return response.data
//     }
//     catch(err){
//         return (err.response.data)

//     }}
// )

//update Order Status

export const updateOrder = createAsyncThunk(
    "product/cancelOrder",
    async (data) => {
      const response = await http.put(`/order/${data.id}`,data);
  
      return response.data;
    }
  );


export const clearOrderError = createAction("clearOrderError");


const orderSlice=createSlice({
    name:"order",
    initialState,
    extraReducers:{
        [createOrder.pending]:(state,action)=>{
            
           
            return{
                ...state,
                loading:true,
                
            }

        },
        [createOrder.fulfilled]:(state,action)=>{
            return{
                ...state,
                loading:false,
                order:action.payload,
                ordercreated:true

            }
        },
        [createOrder.rejected]:(state,action)=>{
            return{
                ...state,
                loading:false,
                err:action.payload,
                ordercreated:false
            }
        },


        //my oreder

        [getMyOders.pending]:(state,action)=>{
            return{
                ...state,
                loading:true,
               
            }

        },
        [getMyOders.fulfilled]:(state,action)=>{
            return{
                ...state,
                loading:false,
                myOrder:action.payload,
                mylist:true
                
            }

        },
        [getMyOders.rejected]:(state,action)=>{
            return{
                ...state,
                loading:false,
               err:action.payload
                
            }

        },

        //get Single order
        [getSingleOrder.pending]:(state,action)=>{
            return{
                ...state,
                loading:true,
               
            }

        },
        [getSingleOrder.fulfilled]:(state,action)=>{
            return{
                ...state,
                loading:false,
                singleOrder:action.payload
                
            }

        },
        [getSingleOrder.rejected]:(state,action)=>{
            return{
                ...state,
                loading:false,
               err:action.payload
                
            }

        },


       // //update order status

     [updateOrder.pending]: (state, action) => {
        return {
          ...state,
          loading: true,
  
          error: null,
        };
      },
  
      [updateOrder.fulfilled]: (state, action) => {
        return {
          ...state,
          loading: true,
          orderStatus:true
      
        };
      },
  
      [updateOrder.rejected]: (state, action) => {
        return {
          ...state,
          loading: false,
  
          error: action.payload,
          orderStatus:false
        };
      },
        [clearOrderError]: (state, action) => {
            return {
              ...state,
              err: null,
              orderStatus:null,
              ordercreated:false
            };
          },

        
    }

})
const {reducer}=orderSlice
export default reducer;