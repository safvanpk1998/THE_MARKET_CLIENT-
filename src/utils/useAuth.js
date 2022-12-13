import React from 'react'
import { useSelector, useDispatch } from "react-redux";


function UseAuth() {
    const dispatch = useDispatch();
    const { loading, loginError, user, isAuthenticated } = useSelector(
        (state) => state.user
        
      );
      let roles=""

      if(user){
        roles=user.role
        
        return {roles}

        
      }
      
    
    return {  roles: "", auth:isAuthenticated  }
}

export default UseAuth