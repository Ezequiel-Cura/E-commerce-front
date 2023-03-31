import React,{useState,useRef} from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import createProduct from "../../redux/reducer/Products/Actions/createProduct";
import styles from "./createProduct.module.css"

import {ToastContainer,toast} from "react-toastify"
import { validate } from "./Validator";
import * as yup from "yup"

export type formData ={
    name:string,
    stock:number,
    product_price: number,
    product_image: any,
    presentation: string,
    categories: Array<string>,
    categories_string: string,
    variants: string
}


const CreateProduct = ()=>{
    const dispatch = useAppDispatch()
    const productState = useAppSelector((state)=>state.Products)
    const inputCategories:any = useRef("")
    const inputVariants:any = useRef("")
    //STATES
    const [variants,setVariants] =useState<Array<string>>()
    const [image,setImage] =useState<any>()
    const [previewImage, setPreviewImage] = useState<string>()
    const [allFormData, setAllFormData] = useState<formData>({
        name:"",
        stock:0,
        product_price:0,
        presentation:"",
        categories:[],
        product_image:{},
        categories_string:"",
        variants:""
    })
    //REACT HOOK FORM
    // if(productState.status === "failed")console.log("NO ENVIO NADA AL BACK")
    
    
    const handleOnSubmit = async(e:any)=>{
        e.preventDefault()
        validat()
        // const imageid = await uploadImage(image)
        allFormData.categories_string = JSON.stringify(allFormData.categories)
        allFormData.product_image = image
        allFormData.variants = JSON.stringify(variants) || ""
        // console.log("OBJECT",allFormData)
        
        const errors = validate(allFormData)
        // console.log("ERRORS",errors)
        if(Object.keys(errors).length === 0){
            const res = await dispatch(createProduct(allFormData))
            // console.log(res.error.message)
            if(res?.error?.message === "Rejected")return
            setAllFormData({
                name:"",
                stock:0,
                product_price:0,
                presentation:"",
                categories:[],
                product_image:{},
                categories_string:"",
                variants:""
            })

        }else{
            // console.log("No se hizo el envio")
        }
    }
    
    const productSchema = yup.object().shape({
        name:yup.string(),
        presentation:yup.string(),
        variants_string:yup.string(),
        categories_strgin:yup.string(),
        stock:yup.number(),
        product_price:yup.number(),
        categories:yup.array(),
        product_image:yup.object().required()
    })

    const validat =async ()=>{
        const productValidate = await productSchema.validate(allFormData)
        // console.log("VALUE YUP",productValidate)
    }   


    
    const setFormDataState = (event:any)=>{
      
        event.preventDefault()
        setAllFormData({
            ...allFormData,
            [event.target?.name] : event.target?.value 
        })

        // console.log(allFormData)
    }
    // SETTING CATEGORIES
    const handleClickCategories = ()=>{
        if(allFormData.categories.includes(inputCategories.current.value) || inputCategories.current.value=== "")return 
        // setCategories([...categories,inputCategories.current.value])
        setAllFormData({
            ...allFormData,
            categories: [...allFormData.categories, inputCategories.current.value]
        })
        inputCategories.current.value = ""
    }
    // SETTING VARIANTS
    const handleClickVariants = ()=>{
        if(variants?.includes(inputVariants.current.value) || inputVariants.current.value=== "")return 
        // setCategories([...categories,inputCategories.current.value])
        setVariants([...variants || [],inputVariants.current.value])
        inputVariants.current.value = ""
        // console.log(variants)
    }
    const previewSource = (file:any)=>{
        const imagefile = file[0]
        const reader = new FileReader()
        reader.readAsDataURL(imagefile);
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        setImage(imagefile)
    }
    return(
        <div>
            <h4>Create a Product</h4>
            <form onSubmit={handleOnSubmit}  className={styles.form} encType="multipart/form-data" >
                <div>
                    <div>
                        <label>Name:</label>
                        <input 
                            type="text"
                            placeholder="Product name..." 
                            name="name"
                            value={allFormData.name}
                            onChange={setFormDataState}
                        />
                    </div>

                    {/* {errors.name && <span>Name is required</span>} */}
                    <div>
                        <label>stock:</label>
                        <input 
                            type="number" 
                            name="stock"
                            value={allFormData.stock}
                            onChange={setFormDataState}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <label>Price:</label>
                        <input 
                            type="number" 
                            name="product_price"
                            value={allFormData.product_price}
                            onChange={setFormDataState}
                        />
                    </div>
                    
                    <div>
                        <label>Presentation:</label>
                        <input 
                            type="text" 
                            name="presentation" 
                            value={allFormData.presentation}
                            onChange={setFormDataState}                        
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <label>Categories:</label>
                        <input 
                            type="text" 
                            name="categories"
                            ref={inputCategories}
                        />
                        <button onClick={()=>handleClickCategories()} type="button">ADD</button>
                        <div>
                            {allFormData.categories?.length > 0? (
                                allFormData.categories.map((categ,index)=>(
                                    <span key={index}>{categ} - </span>
                                ))
                                )
                            : null}
                        </div>
                    </div>                

                    <div>
                        <label>Variants:</label>
                        <input 
                            type="text" 
                            name="variants"
                            ref={inputVariants}
                        />
                        <button onClick={()=>handleClickVariants()} type="button">ADD</button>
                        <div>
                            { variants && variants.length > 0? (
                                variants?.map((variants,index)=>(
                                    <span key={index} id={`${index}`}>{variants} - </span>
                                ))
                                )
                            : null}
                        </div>
                    </div>
                </div>


                <div>
                    <label>Image: </label>
                    <input 
                        type="file" 
                        name="product_image" 
                        onChange={(e)=>previewSource(e.target.files)}
                    />
                    {previewImage ? <img src={previewImage} alt="img" className={styles.preview_img} /> : null}
                </div>
                        
                {/* <label></label>
                <input type="text" /> */}
               

                <button type="submit">Submit</button>
            </form>
            <div>
                    
            
            </div>
            
        </div>
    )
}

export default CreateProduct;







// const uploadImage = async(image:any) => {
//     console.log("IMAGE",image)
//     const data1 = new FormData()
//     data1.append("file", image)
//     data1.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`)
//     console.log("FORMDATA",data1)
//     return data1
    
// }