import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPriv from "../../../../api/axios";


const checkoutStripe:any = createAsyncThunk("user/checkout",
    async(cart,{rejectWithValue})=>{
        try{
            const res:any = await axiosPriv.post("user/create-checkout-session",{
                cart,
                user: "2134"
            })
        }catch(error:any){
            return rejectWithValue(error.response.data)
        }
    }

)

export default checkoutStripe