import React,{useState,useEffect} from 'react'
//CSS
import styles from "./LoginForm.module.css"


export default function LoginForm() {
    
    return (
         <div className={styles.cointainer}>
            <div className={styles.wrapper_form}>
                <form className={styles.form}>
                    <span>Please Login</span>

                    <input type="text" name='mail' placeholder='Mail'/>

                    <input type="password" name='password' placeholder='password'/>

                    <button>Submit</button>
                </form>
            </div>
         </div>
    )
}
