import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosPriv from "../../../../api/axios";



const getProduct: any = createAsyncThunk("product/getProduct",
   async (id) => {
    try {
        console.log("ID",id)
        const {data} = await axiosPriv.get("/Product/" + id)
        console.log("ACTION",data)
        return data?.product
    } catch (error:any) {
        return isRejectedWithValue(error.response.data)
    }
   }
)

export default getProduct;