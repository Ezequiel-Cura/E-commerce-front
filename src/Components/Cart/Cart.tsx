import React, { useEffect } from "react"
import { useAppDispatch,useAppSelector } from "../../redux/Hooks"
import { addProductQuantity, deductProductQuantity ,getCartLocalStorage} from "../../redux/reducer/webPage/webPageReducer"
import styles from "./Cart.module.css"
import {Image} from "cloudinary-react"

const Cart = ()=>{
    const dispatch = useAppDispatch()
    const cart = useAppSelector(state=>state.webPageReducer.cart)

    useEffect(()=>{
        dispatch(getCartLocalStorage())
    },[])

    const handleAddQuantity = (id:string)=>{
        
        dispatch(addProductQuantity({id}))
    }

    const handleDeductQuantity = (id:string)=>{
        
        dispatch(deductProductQuantity({id}))
    }

    return (
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

                            </div>
                        </div>
                    ))
                    :
                    (<h5>No hay productos agregador</h5>)
                }
            </div>
            <div className={styles.btn_wrapper}>
                <button className={styles.btn} >Enviar Pedido</button>
            </div>
        </div>
    )
}


export default Cart