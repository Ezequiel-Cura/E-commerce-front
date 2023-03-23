import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import getAllProducts from '../../redux/reducer/Products/Actions/getAllProducts'
import {Image} from "cloudinary-react"
import styles from "./Products.module.css"
import { addProduct, getCartLocalStorage,addProductQuantity,deductProductQuantity } from '../../redux/reducer/webPage/webPageReducer'
import getUserInfo from '../../redux/reducer/User/Actions/getUserInfo';
import { orderAZ, orderByCategory, orderZA,searchProduct } from '../../redux/reducer/Products/ProductsReducer'



export default function Products() {
  const dispatch = useAppDispatch()
  const {allProducts,productsArray} = useAppSelector((state)=> state.Products)
  const user = useAppSelector((state)=> state.UserReducer.user)
  const cart = useAppSelector(state=>state.webPageReducer.cart)
  const [categorie,setCategories]= useState(Array<string>)
  const [cartIds,setCartIds] = useState(Array<string>)


  let categories:Array<string> = [];
  function getCategories ():Array<string>{
    console.log("1 - getCategories function")
    if(allProducts?.length !== 1){
      allProducts.map((p)=> categories = [...categories,...p.categories])
      categories = [...new Set(categories)]
      setCategories(categories)
      return categories
    }else{
      return []
    }
  }
  let cartIdsArray:Array<string> = []
 
  function getCartIds():Array<string>{
    console.log("2 - getCartsId function")

    if(cart?.length !== 1){
      cart.map((c)=>cartIdsArray= [...cartIdsArray,c.id])
      setCartIds(cartIdsArray)
      return cartIdsArray
    }else{
      return []
    }
  }
  
  useEffect(()=>{
    console.log("3 - useEffect1 function")
    
    if(productsArray?.length > 1)return
      console.log("3 - useEffect1 function 1")
      dispatch(getAllProducts())
      console.log("3 - useEffect1 function 2")

    if(!user?.email){
      console.log("3 - useEffect1 function 3")

      dispatch(getUserInfo())
      dispatch(getCartLocalStorage())
      console.log("3 - useEffect1 function 4")

    }
    
    
    
  },[dispatch])
  
  useEffect(()=>{    
    console.log("4 - useEffect2 function")

    getCategories()
    getCartIds()
  },[allProducts,dispatch,cart])

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
    dispatch(orderByCategory({category: e.target?.value}))
    // dispatch(getProductsByCategory(e.target.value))
  }

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    dispatch(searchProduct(e.target.value))
  }
  const handleAddQuantity = (id:string)=>{         
    dispatch(addProductQuantity({id}))
  }

  const handleDeductQuantity = (id:string)=>{    
    dispatch(deductProductQuantity({id}))
  }


  return (
    <div className={styles.product_component}>
      <div className={styles.filter_cointainer}>
               <div className={styles.filter_items}>Categorias</div>
        <select name="Category"  className={styles.filter_items} onChange={(e:any)=>handleCategory(e)}>
          <option value="default">Todas</option>
          {
            categorie?.length > 0 ?  categorie?.map(c=>(
              <option value={c} key={c}>{c}</option>
            ))
            :null
          }
          
        </select>
          
                 <div className={styles.filter_items}>A-Z</div>
        <select name="Alphabety" id="" className={styles.filter_items} onChange={(e:any)=>handleChangeAZ(e)}>
          <option value="default">order</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>

        <div>
          <span>Búsqueda:</span>
          <input type="text" onChange={(e)=>{
              handleSearch(e)
              
            }}/>
        </div>
      </div>
      <div className={styles.products_wrapper}>

        {productsArray?.length ? productsArray?.map((p,i)=>(
          <div className={styles.products_cointainer} key={p.product_id}>
            <Link to={"/product/" + p.product_id}>              
              <span>{p.name}</span>
            </Link>
            {/* <span>Price: {p.product_price}</span>
            <span>Stock: {p.stock} </span> */}
            <span>Presentacion:{p.presentation} </span> 
            <span>Categorias: {p.categories && p.categories.join(" - ")}</span>
            {/* <span>Variants: {p.variants && p.variants.join("/")}</span> */}
            <Image 
              cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
              publicId={p.product_image}>
            </Image>
            <div>
                            
              {
                user?.email?.length ? 
                cartIds.includes(p.product_id) ? (
                  <div key={p.product_id}>
                      <button onClick={()=>handleDeductQuantity(p.product_id)}>-</button>
                      <span>{cart.find(c => p.product_id === c.id)?.quantity}</span>
                    <button onClick={()=>handleAddQuantity(p.product_id)}>+</button>
                  </div>
                )
                :(
                  <button key={p.product_id} disabled={user?.email ? false : true} onClick={()=>handleClickAdd(p.name,p.product_id,p.product_image)} className={styles.btn_add}>Agregar</button>
                )
                :null

              }
            </div>
          </div>
        ))
        : (<h5>Products not found</h5>)
      
      }
      </div>
    </div>
  )
}

// user.name.length ?
//   cart && cart.map((c,i)=>{
//     console.log("IDS",c.id + "===" + p.product_id)
    
//     if(c.id === p.product_id){
//       return(
//         <div key={c.id}>
//           <button>-</button>
//           <span>{c.quantity}</span>
//           <button>+</button>
//         </div>
//       )
//     }else{
//       return(
//         <button key={c.id} disabled={user?.email ? false : true} onClick={()=>handleClickAdd(p.name,p.product_id,p.product_image)} className={styles.btn_add}>Agregar</button>
//       )
//     }
//   })
// :null