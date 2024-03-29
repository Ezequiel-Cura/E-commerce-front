export interface Iproducts{
    status:"idle" | "fulfilled" | "failed" | "loading",
    errors:string,
    productsArray:products[],
    allProducts:products[],
    oneProduct: {
        name:"",
        product_id:"",
        stock:0,
        product_image:"",
        product_price:0,
        presentation:"",
        categories:[],
        out_of_stock:false,
        variants:[]
    }
}

export interface products{           
    product_id:string,
    name:string,
    stock:number,
    product_image:string,
    product_price:number,
    presentation:string,
    categories: string[],
    out_of_stock:boolean
    variants:string [] ,
    feature:boolean       
    
}



export interface IwebPage{
    status:"idle" | "fulfilled" | "failed" | "loading",
    errors:string,
    webPageStatus:{
        loginForm:boolean,
        registerForm:boolean  
    },
    cart:Array<productStructure>
}
interface productStructure{
    id:string,
    name:string,
    quantity:number,
    img:string,
    price:number
}

export interface Iusers{
    status:"idle" | "fulfilled" | "failed" | "loading",
    errors:{
        statusCode: number,
        errorMsg:string
    },
    success:{
        msg:string,
        statusCode:number
    },
    user:{
        name:string,
        email:string,
        password:string,
        isAdmin:boolean,
        img:string,
        token:string
    }
}


export interface productInCart {
    id:string,
    name:string,
    img:string,
    price:number
}
