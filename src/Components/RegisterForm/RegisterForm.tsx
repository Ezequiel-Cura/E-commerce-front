import React,{useState,useEffect} from 'react'
import { registerForm } from '../../Interfaces/registerForm'
import styles from "./RegisterForm.module.css"

export default function RegisterForm() {
  const [input,setInput] = useState<registerForm>({
    name:"",
    mail:"",
    password:""
  })

  const handleChange = (e:Event)=>{
    
  }

  const handleSubmit = ()=>{

  }

  return (
    <div className={styles.cointainer}>
      <div className={styles.wrapper_form}>
          <form className={styles.form}>
              <span>Please Register</span>
              <input type="text" name='name' placeholder='Name'/>

              <input type="text" name='mail' placeholder='Mail'/>

              <input type="password" name='password' placeholder='Password'/>

              <input type="password" name='password2' placeholder='Repeat password'/>

              <button>Submit</button>
          </form>
      </div>
    </div>
  )
}
