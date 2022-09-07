import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//INTERFACES
import { Iproducts } from "../../interfaces";

//Async Actions
import  getAllProducts  from "./Actions/getAllProducts";
import createProduct from "./Actions/createProduct";

const initialState:Iproducts={
    status:"idle",
    Products: [
        {
        name:"",
        product_id:"",
        stock:0,
        product_image:"",
        product_price:0,
        presentation:"",
        categoris:[],
        out_of_stock:false
        }
    ]
}


const reducerSlice = createSlice({
    name: "products",
    initialState,
    reducers:{

    },
    extraReducers:{
        [getAllProducts.pending]: (state)=>{
            state.status = "loading";
        },
        [getAllProducts.fulfilled]: (state,{payload})=>{
            state.status = "fulfilled";
            state.Products = payload.products
        },
        [getAllProducts.rejected]:(state)=>{
            state.status= "failed"
        },
        //--------
        [createProduct.pending]: (state)=>{
            state.status = "loading"
        },
        [createProduct.fulfilled]:(state)=>{
            state.status = "fulfilled"
        },
        [createProduct.rejected]:(state)=>{
            state.status = "failed"
        }
        //--------


    }
})


export default reducerSlice.reducer