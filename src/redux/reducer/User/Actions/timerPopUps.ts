import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

const timerPopUps:any = createAsyncThunk("user/errorsTimer",
    async(timer,{rejectWithValue})=>{
        try {
            
            return ""
            
        } catch (error) {
            return rejectWithValue(error)
        }
    }

)

export default timerPopUps