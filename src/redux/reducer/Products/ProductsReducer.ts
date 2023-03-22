import { createSlice,current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//INTERFACES
import { Iproducts, products } from "../../interfaces";

//Async Actions
import  getAllProducts  from "./Actions/getAllProducts";
import createProduct from "./Actions/createProduct";
import getProduct from "./Actions/getProduct"
import updateProduct from "./Actions/updateProduct";
import deleteProduct from "./Actions/deleteProduct";
import getProductsByCategory from "./Actions/getProductsByCategory";


const initialState:Iproducts={
    status:"idle",
    errors:"",
    productsArray: [
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
    allProducts:[
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
        orderAZ:(state,action)=>{
            
            state.productsArray.sort((a,b)=>{
                if(a.name.toLowerCase() > b.name.toLowerCase())return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase())return -1;
                return 0;
              })
        },
        orderZA:(state)=>{
           
            state.productsArray.sort((a,b)=>{
                if(a.name.toLowerCase() < b.name.toLowerCase())return 1;
                if(a.name.toLowerCase() > b.name.toLowerCase())return -1;
                return 0;
              })
        },
        orderByCategory:(state,action:PayloadAction<{category:string}>)=>{
            if(action.payload.category === "default"){
                //TENGO QUE AGREGAR EN EL INITIAL STATE OTRO ARRAY DE TODOS LOS PRODUCTOS POR SI QUIEREN VOLVER AL ORDEN DEFAULT
                state.productsArray = state.allProducts
            }else{                                
                state.productsArray = state.allProducts.filter((p)=>p.categories.includes(action.payload.category)) 
            }
        },
        searchProduct:(state,action:PayloadAction<string>)=>{
            state.productsArray = state.allProducts.filter(p=>p.name.toLowerCase().includes(action.payload.toLowerCase()))
        }
    },
    extraReducers:{
        [getAllProducts.pending]: (state)=>{

            state.status = "loading";
        },
        [getAllProducts.fulfilled]: (state,{payload})=>{
            state.status = "fulfilled";
            state.productsArray = payload.products
            state.allProducts = payload.products
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
            
        },
        [updateProduct.rejected]:(state)=>{
            state.status = "failed";
        },
        //-------------------------------------
        [deleteProduct.pending]: (state)=>{
            state.status = "loading";
        },
        [deleteProduct.fulfilled]: (state,{payload})=>{
            state.status = "fulfilled";
            
        },
        [deleteProduct.rejected]:(state)=>{
            state.status = "failed";
        },
        //-------------------------------------
        [getProductsByCategory.pending]: (state)=>{
            state.status = "loading";
        },
        [getProductsByCategory.fulfilled]: (state,{payload})=>{
            state.status = "fulfilled";
            state.productsArray = payload.products
        },
        [getProductsByCategory.rejected]:(state)=>{
            state.status = "failed";
        },
        //---------------------------------------
    }
})

export const {orderAZ,orderByCategory,orderZA,searchProduct} = reducerSlice.actions

export default reducerSlice.reducer