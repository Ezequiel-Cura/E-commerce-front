import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "../../../../api/axios";


const logOut:any = createAsyncThunk("user/logout",
    async(email,{rejectWithValue})=>{
        try {
            const {data} = await axios.get("/auth/logout",{
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