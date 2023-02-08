import React, { useEffect } from "react"
import { useAppDispatch,useAppSelector } from "../../redux/Hooks"
import { addProductQuantity, deductProductQuantity ,getCartLocalStorage} from "../../redux/reducer/webPage/webPageReducer"


const Cart = ()=>{
    const dispatch = useAppDispatch()
    const cart = useAppSelector(state=>state.webPageReducer.cart)

    useEffect(()=>{
        dispatch(getCartLocalStorage())
    },[])

    const handleAddQuantity = (id:string)=>{
        
        dispatch(addProductQuantity({id}))
    }

    const handleDecuctQuantity = (id:string)=>{
        
        dispatch(deductProductQuantity({id}))
    }

    return (
        <div>
            <h4>Your Cart</h4>
            {
                cart.map((c,i)=>(
                    <div key={i}>
                        <span>Id:{c.id}</span>
                        <span>Name:{c.name}</span>
                        <span>Quantity:{c.quantity} <button onClick={()=>handleAddQuantity(c.id) }>+</button><button onClick={()=>handleDecuctQuantity(c.id) }>-</button></span>
                    </div>
                ))
            }
        </div>
    )
}


export default Cart