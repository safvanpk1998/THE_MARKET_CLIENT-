import { http } from "../http-common";
import * as apiUrl from "./apiUrl";




//product data apis


export const getProduct = async (current,limit) => {
  try {
    const response = await http.get(`${apiUrl.getAllProduct}?page=${current}&limit=${limit}`);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};


export const updateproduct = async (id,data) => {
    try {
      const response = await http.put(apiUrl.updateProduct + id,data);
      return response.data;
    } catch (err) {
      return {
        error: true,
        err,
      };
    }
   
  };



export const deleteProduct = async (id) => {
    try {
      const response = await http.delete(apiUrl.deleteProduct + id);
      return response.data;
    } catch (err) {
      return {
        error: true,
        err,
      };
    }
   
  };




//user data apis

export const getAllUserDatas = async (current,limit) => {
  try {
    const response = await http.get(`${apiUrl.getAllUserData}?page=${current}&limit=${limit}`);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const updateUserRoles = async (id,data) => {
  try {
    const response = await http.put(apiUrl.updateUserRole + id,data);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
 
};

export const deleteUser = async (id) => {
    try {
      const response = await http.delete(apiUrl.deleteUser + id);
      return response.data;
    } catch (err) {
      return {
        error: true,
        err,
      };
    }
   
  };
    //Order data apis

export const getAllOrderDatas = async (current,limit) => {
  try {
    const response = await http.get(`${apiUrl.getAllOrderData}?page=${current}&limit=${limit}`);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
};

export const updateOrderStatus = async (id,data) => {
  try {
    const response = await http.put(apiUrl.updateOrderStatus + id,data);
    return response.data;
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
 
};

export const deleteOrder = async (id) => {
    try {
      const response = await http.delete(apiUrl.deleteOrder + id);
      return response.data;
    } catch (err) {
      return {
        error: true,
        err,
      };
    }
   
  };


  //stocker

  export const createNewStocker = async (data) => {
    try {
      const response = await http.post(apiUrl.createStocker,data);
      return response.data;
    } catch (err) {
      return {
        error: true,
        err,
      };
    }
   
  };

  export const getStockers = async () => {
    try {
      const response = await http.get(apiUrl.getAllStocker);
      return response.data;
    } catch (err) {
      return {
        error: true,
        err,
      };
    }
   
  };

