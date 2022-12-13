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

  //create Order

// export const createNewWishList=createAsyncThunk(
//     "wishlist/new",
//     async(id,{rejectWithValue})=>{
//         try{
//             const response=await http.post(`/wishlist/new/${id}`)
//             return response.data

//         }
//         catch(err){
//             return rejectWithValue(err.response.data)

//         }
//     }
// )

export const getStockersList=createAsyncThunk(
    "/stocker/allstocker",
    async()=>{
    
    try{
        const response=await http.get("/stocker/allstocker")
        return response.data
    }
    catch(err){
        return (err.response.data)

    }}
)





// export const deleteWishList=createAsyncThunk(
//     "wishlist/delet",
//     async(id)=>{
//         console.log(id)
    
//     try{
//         const response=await http.delete(`/wishlist/${id}`)
//         return response.data
//     }
//     catch(err){
//         return (err.response.data)

//     }}
// )

export const clearWishListError = createAction("clearWishListError");


const stockerSlice=createSlice({
    name:"Stocker",
    initialState,
    extraReducers:{

        // [createNewWishList.pending]:(state,action)=>{
            
           
        //     return{
        //         ...state,
        //         loading:true,
                
        //     }

        // },
        // [createNewWishList.fulfilled]:(state,action)=>{
        //     return{
        //         ...state,
        //         loading:false,
        //         wishList:action.payload,
        //         productadded:true

        //     }
        // },
        // [createNewWishList.rejected]:(state,action)=>{
        //     return{
        //         ...state,
        //         loading:false,
        //         err:action.payload,
        //         productadded:false
        //     }
        // },


        //my getMyWishList

        [getStockersList.pending]:(state,action)=>{
            return{
                ...state,
                loading:true,
             
               
            }

        },
        [getStockersList.fulfilled]:(state,action)=>{
            return{
                ...state,
                loading:false,
                stocker:action.payload
                
            }

        },
        [getStockersList.rejected]:(state,action)=>{
            return{
                ...state,
                loading:false,
               err:action.payload
                
            }

        },

        // //delete WishList
        // [deleteWishList.pending]:(state,action)=>{
        //     return{
        //         ...state,
        //         loading:true,
               
        //     }

        // },
        // [deleteWishList.fulfilled]:(state,action)=>{
        //     return{
        //         ...state,
        //         loading:false,
        //         wishList:action.payload,
        //         itemdeleted:"deleted"
                
        //     }

        // },
        // [deleteWishList.rejected]:(state,action)=>{
        //     return{
        //         ...state,
        //         loading:false,
        //        err:action.payload,
        //        itemdeleted:"error"
                
        //     }

        // },
        // [clearWishListError]: (state, action) => {
        //     return {
        //       ...state,
        //       err: null,
        //       productadded:null,
        //       itemdeleted:null
        //     };
        //   },



      
        
    }

})
const {reducer}=stockerSlice
export default reducer;