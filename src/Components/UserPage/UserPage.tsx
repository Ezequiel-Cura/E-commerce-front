import React from "react";
import { useAppSelector } from "../../redux/Hooks";
import {Image} from "cloudinary-react"

export default function UserPage() {
  const user = useAppSelector((state)=> state.UserReducer.user)




  return (
    <div>
        <Image 
          cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
          publicId={user.img}>
        </Image>
        
        <span>Name: {user.name}</span>
        <br />
        <span>Mail: {user.email}</span>
    </div>
  )
}
