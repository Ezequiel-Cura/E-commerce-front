import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosPriv from "../../../../api/axios";

const deleteProduct:any = createAsyncThunk("product/delete",
    async(product_id,{rejectWithValue})=>{
        try {
            
            const {data} = await axiosPriv.delete("/Product/" + product_id)

        } catch (error:any) {
            console.log("ACTION",error)
            return rejectWithValue(error.response.data)
        }
    }
)

export default deleteProduct;