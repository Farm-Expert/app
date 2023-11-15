import {createSlice} from "@reduxjs/toolkit";

const Auth=createSlice({
    name:"Token",
    initialState:{
        value:"njnj",
    },
    reducers:{
        add:(state,action)=>{
            state.value=action;
        },
        remove:(state)=>{
            state.value="";
        }
    }
})

export const {add,remove}=Auth.actions;
export default Auth.reducer