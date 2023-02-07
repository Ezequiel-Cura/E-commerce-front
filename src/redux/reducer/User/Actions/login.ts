import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../../../api/axios";

const login:any = createAsyncThunk("user/login",
    async(user_obj,{rejectWithValue})=>{
        try {
            const {data} = await axios.post("/auth/login",user_obj)
            console.log(user_obj)
            console.log("data",data)
            return data
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export default login