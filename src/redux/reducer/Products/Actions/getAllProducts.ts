import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


const getAllProducts: any = createAsyncThunk("product/getProducts",
   async () => {
    try {
        const {data} = await axios.get("/Product/getProducts")
        return data
    } catch (error:any) {
        return isRejectedWithValue(error.response.data)
    }
   }
)

export default getAllProducts;