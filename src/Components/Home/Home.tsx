import React,{useEffect} from 'react'
import { useAppDispatch,useAppSelector } from '../../redux/Hooks';
import getUserInfo from '../../redux/reducer/User/Actions/getUserInfo';
import styles from "./Home.module.css"

import { Link } from 'react-router-dom';
import {Image} from "cloudinary-react"
import getAllProducts from '../../redux/reducer/Products/Actions/getAllProducts';

import {Swiper,SwiperSlide} from "swiper/react"
import {Pagination,Navigation,Thumbs} from "swiper"
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  // const axiosPrivate = useAxiosPrivate();


  const dispatch = useAppDispatch()
  const user = useAppSelector(state=> state.UserReducer.user)
  const products = useAppSelector(state=> state.Products.Products)

  const featureProducts = products.filter((p)=> p.feature )
  console.log(featureProducts)
  useEffect(()=>{
    if(!user?.email){
      console.log("hola")
      dispatch(getUserInfo())
    }
    if(products.length === 1){
      dispatch(getAllProducts())
    }
  },[dispatch])


  return (
    <div>
        
        <h1>Home</h1>
        <div>
          Novedades
        </div>
        <div>
          <h5>Features Products</h5>    
          <div className={styles.p_wrapper}>
            <Swiper 
              slidesPerView={5}
              spaceBetween={10}
              pagination={{
                clickable:true
              }}
              modules={[Navigation,Thumbs,Pagination]}
              className={styles.product_images_slider}
              breakpoints={
                {
                  320:{
                    slidesPerView:2
                  },
                  480:{
                    slidesPerView:3
                  },
                  640:{
                    slidesPerView:4
                  }
                }

              }
              >
                
            {            
              featureProducts.length && featureProducts.map((p,i)=>(
                <SwiperSlide key={i}>
                  <div className={styles.p_wrapper}>
                      {/* <Link to={"/product/" + p.product_id }> */}
                        <Image 
                          cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
                          publicId={p.product_image}>
                        </Image>
                        <span>{p.name}</span>
                      {/* </Link> */}
                  </div>
                    
                </SwiperSlide>
              ))
            }  
            </Swiper>
          
          </div>  
        </div>
    </div>
  )
}

{/* <div className={styles.p_wrapper}>
                    <Link to={"/product/" + p.product_id }>
                    <Image 
                      cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
                      publicId={p.product_image}>
                    </Image>
                    <span>{p.name}</span>
                    </Link>
                  </div> */}