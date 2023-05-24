import React, { useEffect, useState } from "react"
import { useAppDispatch,useAppSelector } from "../../redux/Hooks"
import { addProductQuantity, deductProductQuantity ,getCartLocalStorage} from "../../redux/reducer/webPage/webPageReducer"
import styles from "./Cart.module.css"
import {Image} from "cloudinary-react"
import axiosPriv from "../../api/axios"


const Cart = ()=>{
    const dispatch = useAppDispatch()
    const [totalPrice,setTotalPrice] = useState(Number)
    const cart = useAppSelector(state=>state.webPageReducer.cart)
    const user = useAppSelector(state=>state.UserReducer.user)


    useEffect(()=>{
        dispatch(getCartLocalStorage())
        console.log("hola")
        totalPriceCart()
    },[])

    
    const handleAddQuantity = (id:string)=>{
        
        dispatch(addProductQuantity({id}))
    }
    
    const handleDeductQuantity = (id:string)=>{
        
        dispatch(deductProductQuantity({id}))
    }
    const totalByProducts = (price:number,quantity:number)=>{        
        
        return price * quantity
    }
    
    const totalPriceCart = ()=>{
        let totalPrice = cart.reduce((accumulator, currentValue)=>{
            return accumulator + (currentValue.price * currentValue.quantity)
        },0)
        setTotalPrice(totalPrice)
    }
    useEffect(()=>{
        totalPriceCart()
    },[totalByProducts])

    const handleCheckout = async()=>{
    //    dispatch(checkoutStripe(cart))
       try {
           const res = await axiosPriv.post("user/create-checkout-session",{
               cart,
               user: user.email
           })
           console.log(res.data.url)
           if(res.data.url){
                console.log("hola")
               window.location.href = res.data.url
           }
        
       } catch (error) {
        console.log(error)
    
        }

    }

    return (
        <div className={styles.cart_cointainer}>
            <div>
                <h4>Tu Carrito</h4>
                <div className={styles.cart_products}>
                    {
                        cart?.length ? cart?.map((c,i)=>(
                            <div key={i} className={styles.products_properties}>
                                <div className={styles.image_wrapper}>
                                <Image 
                                    cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
                                    publicId={c.img}>
                                </Image>
                                </div>
                                <div className={styles.properties}>
                                    {/* <span>Id:{c.id}</span> */}
                                    <span>Name:{c.name}</span>
                                    <span>Quantity:{c.quantity} <button onClick={()=>handleAddQuantity(c.id) }>+</button><button onClick={()=>handleDeductQuantity(c.id) }>-</button></span>
                                    <span>Price:{c.price} </span>
                                    <span>Total: {totalByProducts(c.price,c.quantity)}</span>
                                </div>
                            </div>
                        ))
                        :
                        (<h5>No hay productos agregados</h5>)
                    }
                </div>
                {/* <div className={styles.btn_wrapper}>
                    <button className={styles.btn} >Enviar Pedido</button>
                </div> */}

            </div>
            <div className={styles.pagar_wrapper}>
                <span>Total a pagar: {totalPrice}</span>
                
                <button onClick={()=>handleCheckout()} disabled={!cart.length}>Checkout</button>
                
            </div>
        </div>
    )
}


export default Cart