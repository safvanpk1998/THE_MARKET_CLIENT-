import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDeatails } from "../../slices/productDetailSlice";

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
 
  const productDetail = useSelector((state) => state.products);
  const data = productDetail.productDetails;

  useEffect(() => {
    dispatch(getProductDeatails(id));
  }, [dispatch]);
  return (
    <div>
      {data ? (
        <div key={data.products._id}>
          <p>{data.products.name}</p>
          <p>{data.products.discription}</p>
          <p>{data.products.price}</p>
        </div>
      ) : (
        <div> Some thing went Wrong </div>
      )}
    </div>
  );
}

export default ProductDetails;
