import {createSlice} from "@reduxjs/toolkit";

const Auth=createSlice({
    name:"Token",
    initialState:{
        value:"000",
        profile_img:"https://firebasestorage.googleapis.com/v0/b/farm-expert-d17fd.appspot.com/o/images%2F1704810236599.jpg?alt=media&token=51cfebcb-94ef-411a-a204-905693f90847",
        chat:[{ id: 1, sender: 'Jane', text: `Hi farmer, how are you?` }]
    },
    reducers:{
        add:(state,action)=>{
            state.value=action;
        },
        remove:(state)=>{
            state.value="";
        },
        addProfileimage:(state,action)=>{
            state.profile_img=action.payload;
        },
        addChat:(state,action)=>{
            state.chat=action.payload;
        }
    }
})

export const {add,remove,addProfileimage,addChat}=Auth.actions;
export default Auth.reducer