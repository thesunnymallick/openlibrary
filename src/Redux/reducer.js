import {createReducer} from "@reduxjs/toolkit"

export const subjectReducer=createReducer(
    {
        input:""
    },
   {
     ADD_INPUT: (state, action)=>{
      
        state.input=action.payload;
     }
   }
   )