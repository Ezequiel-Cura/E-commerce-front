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
    ]
}