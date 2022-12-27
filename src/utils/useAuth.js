import React from 'react'
import { useSelector } from "react-redux";


function UseAuth() {

    const { user, isAuthenticated } = useSelector(
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