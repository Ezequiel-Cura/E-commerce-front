import React, { useEffect } from 'react'
import {cleanCart } from "../../redux/reducer/webPage/webPageReducer"
import { useAppDispatch } from '../../redux/Hooks'
import { useNavigate } from 'react-router-dom'

export default function CheckoutSuccess() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(cleanCart())
    },[])

  return (
    <div>
        <h1>Compra Existosa</h1>
        <button onClick={()=> navigate("/home")}>Volver atras</button>
    </div>
  )
}
