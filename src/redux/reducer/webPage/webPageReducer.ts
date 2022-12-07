import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {IwebPage} from "../../interfaces"

const initialState:IwebPage = {
    status:"idle",
    errors:"",
    webPageStatus:{
        loginForm:false,
        registerForm:false
    }
}


const reducerSlice = createSlice({
    name:"webPage",
    initialState,
    reducers:{
        changeLogin:(state)=>{
            state.webPageStatus.loginForm = true /////!state.webPageStatus.loginForm
        },
        changeRegister:(state)=>{
            state.webPageStatus.registerForm = !state.webPageStatus.registerForm
        },
    }
})

export const {changeLogin,changeRegister} = reducerSlice.actions

export default reducerSlice.reducer