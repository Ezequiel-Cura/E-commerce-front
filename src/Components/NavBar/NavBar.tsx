import React,{ FC ,useEffect} from 'react'
import { Link } from 'react-router-dom'
//CSS
import styles from "./Navbar.module.css"
// logo trucho :)
import Logo from "../../multimedia/icons8-product-64.png"
//ICONS
import userIcon from "../../multimedia/user-icon.png"
import cartIcon from "../../multimedia/icons8-cart-32.png"
//Components
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'

import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import {Image} from "cloudinary-react"
import timerPopUps from '../../redux/reducer/User/Actions/timerPopUps'
import logOut from '../../redux/reducer/User/Actions/logout'


const NavBar:FC=()=> {
  const dispatch = useAppDispatch()
  const {errors,success} = useAppSelector((state)=>state.UserReducer)
  const {user} = useAppSelector((state)=>state.UserReducer)

  
  if(errors.errorMsg || success.msg){
    setTimeout(()=>{
      dispatch(timerPopUps(2000))
    },5000)
  }
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(true);
  };
  
  const[openRegister,setOpenRegister] = React.useState(false);
  const registerhandleClose = () => {
    setOpenRegister(false);
  };
  const registerhandleToggle = () => {
    setOpenRegister(!open);
  };
  
  const handleLogOut = ()=>{
    dispatch(logOut(user.email))
  }
  

  return (
    <div>
      { open ? 
      <>
        <div onClick={handleClose} className={styles.backdrop}>
        </div>
        <LoginForm setOpen={setOpen}/>
      </>
      :null}
      {
        openRegister ? 
        <>
          <div onClick={registerhandleClose} className={styles.backdrop}></div>
          <RegisterForm setOpenRegister={setOpenRegister}/>
        </>
        :null
      }
      {/* Error messages -----------------------------------*/}

      {errors.errorMsg?.length > 0 ? 
          <div className={styles.errors_div}>
             <span> {errors.errorMsg}</span>
          </div>
        :  null
      }

      {/* Error messages -----------------------------------*/}


      {/* Succes messages__________________________________________ */}
        {success.msg?.length > 0 ? 
            <div className={styles.success_div}>
              <span>{success.msg}</span>
            </div>  
          :null
        }
      {/* Succes messages__________________________________________ */}



      <div className={styles.firstLayer}>
        <img src={Logo} alt="" />
        <h1>Rico y Sano a mano</h1>
        <div className={styles.link_nav}>
          <div>
            {
              user?.name?.length ? 
                  <>
                    <ul>
                      <div>
                        
                        <ul className={styles.ul_menu}>
                          <Image 
                            cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
                            publicId={user.img}>
                            
                          </Image>
                          {/* <img src={userIcon} alt="user" className={styles.profile_item}/> */}
                          <div className={styles.dropdown_wrapper}>
                            <div className={styles.dropdown}>
                              <Link to="/profile">
                                <button>Profile</button>
                              </Link>
                            </div>
                            <div className={styles.dropdown}>
                              <button onClick={()=>handleLogOut()}>Logout</button>
                            </div>
                            {
                              user.isAdmin ? 
                                <div className={styles.dropdown}>
                                  <Link to="/adminPage">
                                    <button >AdminPage</button>                              
                                  </Link>
                                </div>
                                : null
                            }
                          </div>
                        </ul>
                      </div>
                    </ul>
                  </>
                :
                  <ul className={styles.ul_menu}>
                    <img src={userIcon} alt="user" className={styles.profile_item}/>
                    <div className={styles.dropdown_wrapper}>
                      <div className={styles.dropdown}>
                        <button onClick={handleToggle}>Login</button>
                      </div>
                      <div className={styles.dropdown}>
                        <button onClick={registerhandleToggle}>Register</button>
                      </div>
                    </div>
                  </ul>
            }
            
          </div>
          <div>
            <Link to="/cart">
              
              <img src={cartIcon} alt="cart" /> 
                       
            </Link>
          </div>
        </div>
      </div>
      
      <div className={styles.nav}>
        <Link to="/Home">
          <span>Home</span>
        </Link>
        <Link to="/products">
          <span>Products</span>
        </Link>
        <Link to="promotions">
          <span>Promociones</span>
        </Link>
        <Link to="/recipes">
          <span>Recetas</span>
        </Link>
      </div>
      {/* <Backdrop
        sx={{ color: '#fff' }}
        open={open}
        onClick={handleClose}
      >
    </Backdrop> */}
    </div>
  )
}

export default NavBar;