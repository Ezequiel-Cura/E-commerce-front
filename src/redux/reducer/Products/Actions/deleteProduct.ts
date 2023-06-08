import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosPriv from "../../../../api/axios";

const deleteProduct:any = createAsyncThunk("product/delete",
    async(obj:any,{rejectWithValue})=>{
        try {
            
            let img = obj.image.split("/")
            const {data} = await axiosPriv.delete("/Product/" + obj.id + "&" + img.join("_") )

        } catch (error:any) {
            console.log("ACTION",error)
            return rejectWithValue(error.response.data)
        }
    }
)

export default deleteProduct;