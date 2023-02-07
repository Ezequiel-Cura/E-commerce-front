import { createSlice, current } from "@reduxjs/toolkit";


import { Iusers } from "../../interfaces";

//Actions
import createUser from "./Actions/createUser";
import getUserInfo from "./Actions/getUserInfo";
import login from "./Actions/login";
import logOut from "./Actions/logout";
import timerPopUps from "./Actions/timerPopUps";


const initialState:Iusers = {
    status:"idle",
    errors:{
        statusCode:0,
        errorMsg:""
    },
    success:{
        statusCode:0,
        msg:""
    },
    user:{
        name:"",
        email:"",
        password:"",
        isAdmin:false,
        img:"",
        token:""
    }
}


const reducerSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        
    },
    extraReducers:{
        [createUser.pending]:(state)=>{
            state.status = "loading";

        },
        [createUser.fulfilled]:(state,{payload})=>{            
            state.success.msg = payload.success.msg
            state.status = "fulfilled";
        },
        [createUser.rejected]:(state,{payload})=>{
            state.errors.errorMsg = payload.errorMsg;
            state.status = "failed";
        },
        //-----------
        [login.pending]:(state)=>{
            state.status = "loading"
        },
        [login.fulfilled]:(state,{payload})=>{
            state.status = "fulfilled"
            state.user = payload.user
            localStorage.setItem("accessToken",payload.accessToken)
        },
        [login.rejected]:(state,{payload})=>{
            state.status = "failed"
            
        },
        //-----------
        [timerPopUps.pending]:(state)=>{
            state.status = "loading";
        },
        [timerPopUps.fulfilled]:(state,{payload})=>{
            state.status = "fulfilled";
            state.success.msg = payload;
        },
        [timerPopUps.rejected]:(state,{payload})=>{
            state.status = "failed";
            state.errors.errorMsg = payload
        },
        //-------------------------
        [getUserInfo.pending]:(state)=>{
            state.status = "loading";
        },
        [getUserInfo.fulfilled]:(state,{payload})=>{
            state.status = "fulfilled"
            state.user = payload.user
        },
        [getUserInfo.rejected]:(state,{payload})=>{
            state.status = "failed";
        },
        //-------------------------
        [logOut.pending]:(state)=>{
            state.status = "loading";
        },
        [logOut.fulfilled]:(state,{payload})=>{
            state.status = "fulfilled"
            state.user = payload.user
        },
        [logOut.rejected]:(state,{payload})=>{
            state.status = "failed";
        },
    }

})



export default reducerSlice.reducer