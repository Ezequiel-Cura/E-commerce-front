import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import getAllProducts from '../../redux/reducer/Products/Actions/getAllProducts'
import {Image} from "cloudinary-react"
import styles from "./Products.module.css"
import { addProduct } from '../../redux/reducer/webPage/webPageReducer'
import getUserInfo from '../../redux/reducer/User/Actions/getUserInfo';


export default function Products() {
  const dispatch = useAppDispatch()
  const allProducts = useAppSelector((state)=> state.Products)
  const user = useAppSelector((state)=> state.UserReducer.user)


  useEffect(()=>{
    if(allProducts.Products.length > 1)return
    dispatch(getAllProducts())
    if(!user?.email){
      console.log("hola")
      dispatch(getUserInfo())
    }
  },[dispatch])

  const handleClickAdd = (name:string,id:string,img:string)=>{
    dispatch(addProduct({id,name,img}))
  }



  
  return (
    <div className={styles.product_component}>
      <h5>Products</h5>
      <Link to="/createProduct">
        <span>Create a product</span>
      </Link>
      <div className={styles.products_wrapper}>
        {allProducts?.Products && allProducts?.Products.map((p,i)=>(
          <div className={styles.products_cointainer} key={p.product_id}>
            <Link to={"/product/" + p.product_id}>
              <span>Name: {p.name}</span>
            </Link>
            {/* <span>Price: {p.product_price}</span>
            <span>Stock: {p.stock} </span> */}
            <span>Presentation:{p.presentation} </span> 
            {/* <span>Categories: {p.categories && p.categories.join("/")}</span> */}
            <span>Variants: {p.variants && p.variants.join("/")}</span>
            <Image 
              cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
              publicId={p.product_image}>
            </Image>
            <div>
              <button disabled={user?.email ? false : true} onClick={()=>handleClickAdd(p.name,p.product_id,p.product_image)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
