import React, { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "../../redux/Hooks";
import styles from "./adminPage.module.css"
import getAllProducts from "../../redux/reducer/Products/Actions/getAllProducts";
import { Link } from "react-router-dom";
import updateProduct from "../../redux/reducer/Products/Actions/updateProduct";

const AdmingPage = ()=>{
    const dispatch = useAppDispatch()
    const {Products} = useAppSelector(state => state.Products)
    const {user} = useAppSelector(state => state.UserReducer)

    useEffect(()=>{
        
        if(Products.length === 1){
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
                feature:!feature
            }
        }
        dispatch(updateProduct(obj))
    }


    return (
        <div>
            <h3>Admin Page</h3>
            <h5>Products</h5>

            <div className={styles.table_wrapper}>
                <h5><button onClick={()=>handleRefresh()}>Refresh Products</button></h5>
                <h5><button>  Create Product  </button> </h5> 
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Feature</th>
                        </tr>
                        {
                            Products.map((p,i)=>(
                                <tr key={i}  className={styles.tr}>
                                    <th>{p.product_id}</th>
                                    <th><Link to={"/product/" + p.product_id}>{p.name}</Link></th>
                                    <th><input type="checkbox" checked={p.feature} onChange={()=>handleChangeFeature(p.product_id,p.feature)}/> </th>
                                    <th>Update</th>
                                    <th>Eliminate </th>
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