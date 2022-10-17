import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


const createProduct:any = createAsyncThunk("product/createProduct",
    async(product_obj,{rejectWithValue})=>{
        try {
            console.log("ACTION",product_obj)
            const {data} = await axios.post("/Product",product_obj,{     
                headers: { 'content-type': 'multipart/form-data' }
            }
            )

        } catch (error:any) {
            console.log("ACTION",error)
            return rejectWithValue(error.response.data)
        }
    }
)

export default createProduct;