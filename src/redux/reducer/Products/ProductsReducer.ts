import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//INTERFACES
import { Iproducts } from "../../interfaces";

//Async Actions
import  getAllProducts  from "./Actions/getAllProducts";
import createProduct from "./Actions/createProduct";
import getProduct from "./Actions/getProduct"
import updateProduct from "./Actions/updateProduct";

const initialState:Iproducts={
    status:"idle",
    errors:"",
    Products: [
        {
        name:"",
        product_id:"",
        stock:0,
        product_image:"",
        product_price:0,
        presentation:"",
        categories:[],
        out_of_stock:false,
        variants:[],
        feature:false
        }
    ],
    oneProduct: {
        name:"",
        product_id:"",
        stock:0,
        product_image:"",
        product_price:0,
        presentation:"",
        categories:[],
        out_of_stock:false,
        variants:[]
    }
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
        //-------------------------------------------
        [createProduct.pending]: (state)=>{
            state.status = "loading"
        },
        [createProduct.fulfilled]:(state)=>{
            state.status = "fulfilled"
        },
        [createProduct.rejected]:(state,{payload})=>{
            state.status = "failed";
            state.errors = payload
        },
        //----------------------------------------
        [getProduct.pending]: (state)=>{
            state.status = "loading";
        },
        [getProduct.fulfilled]: (state,{payload})=>{
            state.status = "fulfilled";
            state.oneProduct = payload
        },
        [getProduct.rejected]:(state)=>{
            state.status = "failed";

        },
        //---------------------------------------
        [updateProduct.pending]: (state)=>{
            state.status = "loading";
        },
        [updateProduct.fulfilled]: (state,{payload})=>{
            state.status = "fulfilled";
            state.oneProduct = payload
        },
        [updateProduct.rejected]:(state)=>{
            state.status = "failed";
        },
        //-------------------------------------
    }
})


export default reducerSlice.reducer