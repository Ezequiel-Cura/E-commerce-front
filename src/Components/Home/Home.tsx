import React,{useEffect} from 'react'
import { useAppDispatch,useAppSelector } from '../../redux/Hooks';
import getUserInfo from '../../redux/reducer/User/Actions/getUserInfo';
import styles from "./Home.module.css"
import Products from '../Products/Products';


import { Link } from 'react-router-dom';
import {Image,Transformation} from "cloudinary-react"
import getAllProducts from '../../redux/reducer/Products/Actions/getAllProducts';

import {Swiper,SwiperSlide} from "swiper/react"
import {Pagination,Navigation,Thumbs} from "swiper"
import "swiper/css";
import "swiper/css/pagination";
import { getCartLocalStorage, setCart } from '../../redux/reducer/webPage/webPageReducer';

export default function Home() {
  // const axiosPrivate = useAxiosPrivate();


  const dispatch = useAppDispatch()
  const user = useAppSelector(state=> state.UserReducer.user)
  const {allProducts} = useAppSelector(state=> state.Products)

  const featureProducts = allProducts && allProducts?.filter((p)=> p.feature )
 
  useEffect(()=>{
    if(!user?.email){
      dispatch(getUserInfo())
    }
    if(allProducts.length === 1){

      dispatch(getAllProducts())
    }
    if(!localStorage.getItem("cart")?.length){
      setCart()
    }
  },[dispatch])


  return (
    <div>
        
        
        {/* <div>
          Novedades
        </div> */}
        <div>
          <h3>Productos Destacados </h3>    
          <div className={styles.p_wrapper}>
            <Swiper 
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable:true
              }}
              modules={[Navigation,Thumbs,Pagination]}
              className={styles.product_images_slider}
              breakpoints={
                {
                  600:{
                    slidesPerView:1
                  },
                  1000:{
                    slidesPerView:2
                  },
                  1300:{
                    slidesPerView:3
                  },
                  1600:{
                    slidesPerView:4
                  }
                 
                }

              }
              >
                
            {            
              featureProducts?.length && featureProducts.map((p,i)=>(
                <SwiperSlide key={i}>
                  <div className={styles.p_wrapper}>
                      {/* <Link to={"/product/" + p.product_id }> */}
                        <Image 
                          cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
                          publicId={p.product_image}>
                            <Transformation effect="background_removal" />
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