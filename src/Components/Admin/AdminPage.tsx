import React, { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "../../redux/Hooks";
import styles from "./adminPage.module.css"
import getAllProducts from "../../redux/reducer/Products/Actions/getAllProducts";
import { Link } from "react-router-dom";
import updateProduct from "../../redux/reducer/Products/Actions/updateProduct";
import deleteProduct from "../../redux/reducer/Products/Actions/deleteProduct";
import {Image} from "cloudinary-react"

const AdmingPage = ()=>{
    const dispatch = useAppDispatch()
    const {productsArray} = useAppSelector(state => state.Products)
    const {user} = useAppSelector(state => state.UserReducer)
    console.log(productsArray)
    useEffect(()=>{
        
        if(productsArray.length === 1){
            dispatch(getAllProducts())
        }
    },[])

    const handleRefresh = ()=>{
        dispatch(getAllProducts())
    }

    const handleChangeFeature = (id:string,feature:boolean)=>{
        const obj = {
            product_id:id,
            product_value: {
                feature: true
            }
        }
        dispatch(updateProduct(obj))
    }

    const handleDelete = (id:string,image:string)=>{
        dispatch(deleteProduct({id,image}))
    }
    return (
        <div>
            <h3>Admin Page</h3>
            <h5>Products</h5>

            <div className={styles.table_wrapper}>
                <h5><button onClick={()=>handleRefresh()}>Refresh Products</button></h5>
                <h5><button><Link to="/createProduct">Create Product </Link> </button> </h5> 
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Feature</th>
                        </tr>
                        {
                            productsArray.map((p,i)=>(
                                <tr key={p.product_id}  className={styles.tr}>
                                    <th>
                                        <Image 
                                            cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
                                            publicId={p.product_image}>
                                        </Image>
                                    </th>
                                    <th><Link to={"/product/" + p.product_id}>{p.name}</Link></th>
                                    <th><input type="checkbox" checked={p.feature} onChange={()=>handleChangeFeature(p.product_id,p.feature)}/> </th>
                                    <th>Update</th>
                                    <th><button onClick={()=>handleDelete(p.product_id,p.product_image)}>Eliminate</button></th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default AdmingPage