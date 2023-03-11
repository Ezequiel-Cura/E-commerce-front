import React from "react";
import { useAppSelector } from "../../redux/Hooks";
import {Image} from "cloudinary-react"
import styles from "./userPage.module.css"


export default function UserPage() {
  const user = useAppSelector((state)=> state.UserReducer.user)




  return (
    <div className={styles.user_cointainer}>
        <div className={styles.image_wrapper}>
          <Image 
            cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
            publicId={user.img}>
          </Image>
        </div>
        <div className={styles.user_properties}>          
          <span>Name: {user.name}</span>          
          <span>Mail: {user.email}</span>
        </div>
    </div>
  )
}
