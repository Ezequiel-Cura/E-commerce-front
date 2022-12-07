export interface Iproducts{
    status:"idle" | "fulfilled" | "failed" | "loading",
    errors:string,
    Products:[
        {
            product_id:string,
            name:string,
            stock:number,
            product_image:string,
            product_price:number,
            presentation:string,
            categories: string[],
            out_of_stock:boolean
            variants:string [] 
        }
    ],
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


export interface IwebPage{
    status:"idle" | "fulfilled" | "failed" | "loading",
    errors:string,
    webPageStatus:{
        loginForm:boolean,
        registerForm:boolean  
    }
}