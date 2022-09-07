export interface Iproducts{
    status:"idle" | "fulfilled" | "failed" | "loading",
    Products:[
        {
            product_id:string,
            name:string,
            stock:number,
            product_image:string,
            product_price:number,
            presentation:string,
            categoris: string[],
            out_of_stock:boolean

        }
    ]
}