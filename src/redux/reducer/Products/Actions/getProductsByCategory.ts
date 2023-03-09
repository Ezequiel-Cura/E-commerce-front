import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosPriv from "../../../../api/axios";


const getProductsByCategory:any = createAsyncThunk("product/getProductsByCategory",
    async(category)=>{
        try {
            const {data} = await axiosPriv.get("/Products/" +category )
            return data
        } catch (error:any) {
            return isRejectedWithValue(error.response.data)
        }
    }
)

export default getProductsByCategory