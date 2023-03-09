import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {IwebPage,productInCart} from "../../interfaces"




const initialState:IwebPage = {
    status:"idle",
    errors:"",
    webPageStatus:{
        loginForm:false,
        registerForm:false
    },
    cart:[]
}


const reducerSlice = createSlice({
    name:"webPage",
    initialState,
    reducers:{
        addProduct:(state,action:PayloadAction<productInCart>)=>{
            if(state.cart.find(c=>c.id === action.payload.id)){
                let foundIndex = state.cart.findIndex(c=> c.id === action.payload.id)
                state.cart[foundIndex].quantity += 1
            }else{
                state.cart.push({
                    name:action.payload.name,
                    id: action.payload.id,
                    quantity: 1,
                    img:action.payload.img
                })
                
            }
           
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        deleteProduct:(state,action:PayloadAction<{id:string}>)=>{
            state.cart = state.cart.filter((c)=>{
              if(  c.id !== action.payload.id) return true
              else return false
            })
        },
        addProductQuantity:(state,action:PayloadAction<{id:string}>)=>{
            let foundIndex = state.cart.findIndex(c=> c.id === action.payload.id)
            state.cart[foundIndex].quantity += 1
        },
        deductProductQuantity:(state,action:PayloadAction<{id:string}>)=>{
            
            let foundIndex = state.cart.findIndex(c=> c.id === action.payload.id)

            if(state.cart[foundIndex].quantity === 0){
                state.cart = state.cart.filter((c)=>{
                    if(  c.id !== action.payload.id) return true
                    else return false
                })
            }else{
                state.cart[foundIndex].quantity -= 1
            }
        },
        getCartLocalStorage:(state)=>{
            state.cart = JSON.parse(localStorage.getItem("cart") || "")
        }
    }
})

export const {addProduct,deleteProduct,addProductQuantity,deductProductQuantity,getCartLocalStorage} = reducerSlice.actions

export default reducerSlice.reducer