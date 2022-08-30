import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//INTERFACES
import { Iproducts } from "../../interfaces";



const initialState:Iproducts={
    name:"",
    product_id:0,
    quantity:0
}


export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{

    }
})


