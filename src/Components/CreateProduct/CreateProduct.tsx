import React from "react";
import {useForm} from "react-hook-form"
import { useAppDispatch } from "../../redux/Hooks";
import createProduct from "../../redux/reducer/Products/Actions/createProduct";
import styles from "./createProduct.module.css"
import axios from "axios"

type formData ={
    name:string,
    stock:number,
    product_price: number,
    product_image: string,
    presentation: string,
    categories: Array<string>
}
// jjlfg0dg

const CreateProduct = ()=>{
    const dispatch = useAppDispatch()
    const {register,handleSubmit,watch,setValue,formState:{errors}} = useForm<formData>()
    
    const onSubmit = async(data:any)=>{
      
        const imageid = await uploadImage(data.product_image[0])
        data.product_image = imageid
        data.categories = []
        console.log("222",data)
        dispatch(createProduct(data))
    }
   
    // console.log(watch())

    const uploadImage = async(image:any) => {
        const data1 = new FormData()
        data1.append("file", image)
        data1.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`)
        const {data} = await axios.post("https://api.cloudinary.com/v1_1/dwiv5mfpf/image/upload",data1)
        console.log("LINEA 40",data.public_id)
        return data.public_id
    }

    const handleChangeImage = (ev:any)=>{
        console.log(ev.target.files)
    }
    return(
        <div>
            <h4>Create a Product</h4>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form} encType="multipart/form-data" method="POST">
                <label>Name:</label>
                <input 
                    type="text"
                    placeholder="Product name..." 
                    {...register("name",{required:true,minLength:3})}
                />
                {errors.name && <span>Name is required</span>}
                <label>stock:</label>
                <input type="number" 
                    {...register("stock",{required:true})}

                />

                <label>Price:</label>
                <input type="number" {...register("product_price",{required:true})}
/>
                
                <label>Image: </label>
                <input type="file" {...register("product_image",{required:true})} onChange={(ev)=>handleChangeImage(ev)}/>

                <label>Presentation:</label>
                <input type="text" {...register("presentation",{required:true})}/>

                <label>Categories:</label>
                <input type="select" {...register("categories")}/>

                {/* <label></label>
                <input type="text" /> */}


                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateProduct;