import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {  } from "../../../../api/axios";



const getUserInfo:any = createAsyncThunk("user/getInfo",
    async(user_obj,{rejectWithValue})=>{
        
        console.log("axhiosdafsaf")
        try {
        console.log("axhiosdafsaf")

            const {data} = await axios.get("/user",{
                withCredentials:true
            })
            console.log(user_obj)
            console.log("data",data)
            return data
        } catch (error:any) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export default getUserInfo