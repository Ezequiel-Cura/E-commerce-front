
import { formData } from "./CreateProduct";


export function validate(data:formData){
    const errors:any = {

    }
    if(data.name === ""){
        errors.name = "Name is required"
    }

    // if(data.stock === 0){
    //     errors.stock = "Stock is required"
    // }

    // if(data.categories.length === 0){
    //     errors.categories = "Categories is required"
    // }

    // if(data.product_price === 0){
    //     errors.product_price = "Price is required"
    // }
    return errors
}