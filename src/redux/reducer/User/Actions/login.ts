import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

import axiosPriv from "../../../../api/axios";
// import axios from "axios";

const login:any = createAsyncThunk("user/login",
    async(user_obj,{rejectWithValue})=>{
        try {
            const {data} = await axiosPriv.post("/auth/login",user_obj,{
                withCredentials:true
            })
            
            return data
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export default login