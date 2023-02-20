import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosPriv from "../../../../api/axios";
// import axios from "axios";


const updateProduct:any = createAsyncThunk("product/updateProduct",
    async(product_obj:any,{rejectWithValue})=>{
        try {
            console.log(product_obj)
            const {data} = await axiosPriv.put("/Product",{
                product_id:product_obj.product_id,
                update_value:product_obj.product_value
            },{
                withCredentials:true
            })

            return data
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export default updateProduct