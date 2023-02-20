import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosPriv from "../../../../api/axios";
// import axios from "axios";


const getAllProducts: any = createAsyncThunk("product/getAllProducts",
   async () => {
    try {
        const {data} = await axiosPriv.get("/Products")
        return data
    } catch (error:any) {
        return isRejectedWithValue(error.response.data)
    }
   }
)

export default getAllProducts;