import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


const createProduct:any = createAsyncThunk("product/createProduct",
    async(product_obj,{rejectWithValue})=>{
        try {
            console.log(product_obj)
            const {data} = await axios.post("/Product/create",product_obj)

        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export default createProduct;