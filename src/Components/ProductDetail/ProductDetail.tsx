import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import getProduct from '../../redux/reducer/Products/Actions/getProduct'


export default function ProductDetail() {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const product = useAppSelector(state => state.Products.oneProduct)


    useEffect(() => {
      dispatch(getProduct(id))

    }, [])
    

    return (
        <div>
            
        </div>
    )
}
