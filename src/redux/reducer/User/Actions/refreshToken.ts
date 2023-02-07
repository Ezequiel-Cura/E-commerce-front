import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "../../../../api/axios";

// import { axiosPrivate } from "../../../../api/axios";

const refreshToken:any = createAsyncThunk("user/refreshToken",
    async(refresh_token,{rejectWithValue})=>{
        try {
            const {data} = await axios.get("/refresh",{
                withCredentials:true
            })

            return data.accessToken
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export default refreshToken;