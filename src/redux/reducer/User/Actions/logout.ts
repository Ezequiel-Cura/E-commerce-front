import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosPriv from "../../../../api/axios";
// import axios from "axios";


const logOut:any = createAsyncThunk("user/logout",
    async(email,{rejectWithValue})=>{
        try {
            const {data} = await axiosPriv.get("/auth/logout",{
                withCredentials:true
            })
            localStorage.removeItem("accessToken")
            return data
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export default logOut