import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


const getProduct: any = createAsyncThunk("product/getProduct",
   async (id) => {
    try {
        const {data} = await axios.get("/Product/getProduct/" + id)
        return data
    } catch (error:any) {
        return isRejectedWithValue(error.response.data)
    }
   }
)

export default getProduct;