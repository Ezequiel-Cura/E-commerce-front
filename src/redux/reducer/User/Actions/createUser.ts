import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/axios";

const createUser:any = createAsyncThunk("user/createUser",
    async(user_obj,{rejectWithValue})=>{
        try {
            const res:any = await axios.post("auth/register",user_obj)
            console.log(res.data)
            console.log("data",res)
            
            return res.data
        } catch (error:any) {
            console.log(error.response)
            return rejectWithValue(error.response.data)
        }
    }
)

export default createUser