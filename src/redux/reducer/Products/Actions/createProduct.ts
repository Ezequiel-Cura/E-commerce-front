import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosPriv from "../../../../api/axios";


const createProduct:any = createAsyncThunk("product/createProduct",
    async(product_obj,{rejectWithValue})=>{
        try {
            console.log("ACTION",product_obj)
            const {data} = await axiosPriv.post("/Product",product_obj,{     
                    headers: { 'content-type': 'multipart/form-data' },
                    withCredentials:true
                }
            )

        } catch (error:any) {
            console.log("ACTION",error)
            return rejectWithValue(error.response.data)
        }
    }
)

export default createProduct;