import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPriv, {  } from "../../../../api/axios";
// import axios from "axios";



const getUserInfo:any = createAsyncThunk("user/getInfo",
    async(user_obj,{rejectWithValue})=>{
        
       
        try {
        
            const {data} = await axiosPriv.get("/user",{
                withCredentials:true
            })
            
            return data
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export default getUserInfo