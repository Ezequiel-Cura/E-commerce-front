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
        setCart:(state)=>{
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        addProduct:(state,action:PayloadAction<productInCart>)=>{
            if(state.cart.find(c=>c.id === action.payload.id)){
                let foundIndex = state.cart.findIndex(c=> c.id === action.payload.id)
                state.cart[foundIndex].quantity += 1
            }else{
                state.cart.push({
                    name:action.payload.name,
                    id: action.payload.id,
                    quantity: 1,
                    img:action.payload.img,
                    price: action.payload.price
                })
                
            }
           
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        deleteProduct:(state,action:PayloadAction<{id:string}>)=>{
            state.cart = state.cart.filter((c)=>{
              if(  c.id !== action.payload.id) return true
              else return false
            })
            localStorage.setItem("cart",JSON.stringify(state.cart))

        },
        addProductQuantity:(state,action:PayloadAction<{id:string}>)=>{
            let foundIndex = state.cart.findIndex(c=> c.id === action.payload.id)
            state.cart[foundIndex].quantity += 1
            localStorage.setItem("cart",JSON.stringify(state.cart))

        },
        deductProductQuantity:(state,action:PayloadAction<{id:string}>)=>{
            
            let foundIndex = state.cart.findIndex(c=> c.id === action.payload.id)

            if(state.cart[foundIndex].quantity === 1){
                state.cart = state.cart.filter((c)=>{
                    if(  c.id !== action.payload.id) return true
                    else return false
                })
                localStorage.setItem("cart",JSON.stringify(state.cart))

            }else{
                state.cart[foundIndex].quantity -= 1
                localStorage.setItem("cart",JSON.stringify(state.cart))

            }
        },
        getCartLocalStorage:(state)=>{
            if(localStorage.getItem("cart")){
                state.cart = JSON.parse(localStorage.getItem("cart") || "")
            }
        },
        cleanCart:(state)=>{
            state.cart = []
            localStorage.removeItem("cart")
        }
    }
})

export const {addProduct,deleteProduct,addProductQuantity,deductProductQuantity,getCartLocalStorage,setCart,cleanCart} = reducerSlice.actions

export default reducerSlice.reducer