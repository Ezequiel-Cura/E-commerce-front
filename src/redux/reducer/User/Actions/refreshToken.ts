import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosPriv from "../../../../api/axios";
// import axios from "axios";



const refreshToken:any = createAsyncThunk("user/refreshToken",
    async(refresh_token,{rejectWithValue})=>{
        try {
            console.log("refresh Token action")
            const {data} = await axiosPriv.get("/refresh",{
                withCredentials:true
            })

            return data.accessToken
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export default refreshToken;