import React,{useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {getProduct} from "../slices/productSlice"


function GetProductWithCategory(keyword) {
    const dispatch = useDispatch();
    const product= useSelector(
       (state) => state.products
       
     );
   useEffect(() => {
     dispatch(getProduct(keyword))   
   }, [])
   
   dispatch(getProduct(keyword));
   let data=""

   if(product){
    data=product
     
     return {data}

     
   }
   







     
   
  return {  data:"" }
}

export default GetProductWithCategory