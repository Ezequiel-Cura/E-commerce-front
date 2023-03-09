import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import getAllProducts from '../../redux/reducer/Products/Actions/getAllProducts'
import {Image} from "cloudinary-react"
import styles from "./Products.module.css"
import { addProduct } from '../../redux/reducer/webPage/webPageReducer'
import getUserInfo from '../../redux/reducer/User/Actions/getUserInfo';
import { orderAZ, orderByCategory, orderZA,searchProduct } from '../../redux/reducer/Products/ProductsReducer'
import getProductsByCategory from '../../redux/reducer/Products/Actions/getProductsByCategory'

interface cat2{
  name:string
}

export default function Products() {
  const dispatch = useAppDispatch()
  const {allProducts,productsArray} = useAppSelector((state)=> state.Products)
  const user = useAppSelector((state)=> state.UserReducer.user)
  
  const [categorie,setCategories]= useState(Array<string>)
  
  let categories:Array<string> = [];
  function getCategories ():Array<string>{
    if(allProducts.length !== 1){
      allProducts.map((p)=> categories = [...categories,...p.categories])
      categories = [...new Set(categories)]
      setCategories(categories)
      return categories
    }else{
      return []
    }
    
  }
  

  useEffect(()=>{
    if(productsArray.length > 1)return
    dispatch(getAllProducts())
    if(!user?.email){
      dispatch(getUserInfo())
    }
    
  },[dispatch])
  
  useEffect(()=>{    
    getCategories()
  },[allProducts,dispatch])

  const handleClickAdd = (name:string,id:string,img:string)=>{
    dispatch(addProduct({id,name,img}))
  }

  const handleChangeAZ = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    if(e.target?.value === "A-Z"){
      dispatch(orderAZ(e.target?.value))
    }else if(e.target?.value === "Z-A"){
      dispatch(orderZA())
    }else{
      return
    }
  }

  const handleCategory = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    // dispatch(orderByCategory({category: e.target?.value}))
    dispatch(getProductsByCategory(e.target.value))
  }

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    searchProduct(e.target.value)
  }


  return (
    <div className={styles.product_component}>
      <div className={styles.filter_cointainer}>
               <div className={styles.filter_items}>Categories</div>
        <select name="Category"  className={styles.filter_items} onChange={(e:any)=>handleCategory(e)}>
          <option value="default">default</option>
          {
            categorie?.length > 0 ?  categorie.map(c=>(
              <option value={c} key={c}>{c}</option>
            ))
            :null
          }
          
        </select>
          
                 <div className={styles.filter_items}>A-Z</div>
        <select name="Alphabety" id="" className={styles.filter_items} onChange={(e:any)=>handleChangeAZ(e)}>
          <option value="default">order</option>
          <option value="A-Z">Asc</option>
          <option value="Z-A">Desc</option>
        </select>

        <div>
          <span>Search:</span>
          <input type="text" onChange={(e)=>{
              handleSearch(e)
              console.log("hola")
            }}/>
        </div>
      </div>
      <div className={styles.products_wrapper}>
        {productsArray && productsArray.map((p,i)=>(
          <div className={styles.products_cointainer} key={p.product_id}>
            <Link to={"/product/" + p.product_id}>
              <span>Name: {p.name}</span>
            </Link>
            {/* <span>Price: {p.product_price}</span>
            <span>Stock: {p.stock} </span> */}
            <span>Presentation:{p.presentation} </span> 
            <span>Categories: {p.categories && p.categories.join(" - ")}</span>
            {/* <span>Variants: {p.variants && p.variants.join("/")}</span> */}
            <Image 
              cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
              publicId={p.product_image}>
            </Image>
            <div>
              <button disabled={user?.email ? false : true} onClick={()=>handleClickAdd(p.name,p.product_id,p.product_image)} className={styles.btn_add}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
