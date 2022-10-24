import { createSlice } from "@reduxjs/toolkit";

const initialState={
    selected:{},
    isopen:false
}

const modalslice=createSlice({
    name:'modal',
    initialState,
    reducers:{
        openmodal:(state,action)=>{
          state.isopen=true
          state.selected=action.payload
        },
        closemodal:(state)=>{
            state.isopen=false
        }
    }
})


export const {openmodal,closemodal} =modalslice.actions
export default modalslice