import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


const getAllProducts: any = createAsyncThunk("product/getAllProducts",
   async () => {
    try {
        const {data} = await axios.get("/Product/getAllProducts")
        return data
    } catch (error:any) {
        return isRejectedWithValue(error.response.data)
    }
   }
)

export default getAllProducts;