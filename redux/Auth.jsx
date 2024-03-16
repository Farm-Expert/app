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
        },
        addProfileimage:(state,action)=>{
            state.value.payload.user.profileimage=action;
        }
    }
})

export const {add,remove,addProfileimage}=Auth.actions;
export default Auth.reducer