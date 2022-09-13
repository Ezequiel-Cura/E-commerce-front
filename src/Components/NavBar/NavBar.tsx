import React,{ FC } from 'react'
import { Link } from 'react-router-dom'
//CSS
import styles from "./Navbar.module.css"
// logo trucho :)
import Logo from "../../multimedia/icons8-product-64.png"
//ICONS
import userIcon from "../../multimedia/user-icon.png"
import cartIcon from "../../multimedia/icons8-cart-32.png"


const NavBar:FC=()=> {
  return (
    <div>
      <div className={styles.firstLayer}>
        <img src={Logo} alt="" />
        <h1>Rico y Sano a mano</h1>
        <div className={styles.link_nav}>
          <div>
            <ul className={styles.ul_menu}>
              <img src={userIcon} alt="user" className={styles.profile_item}/>
              <li><Link to="/">SignIn</Link></li>
              
            </ul>
            
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
    </div>
  )
}

export default NavBar;