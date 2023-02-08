import React,{useState,useEffect, FC} from 'react'
import { registerForm } from '../../Interfaces/registerForm'
import styles from "./RegisterForm.module.css"
import { useAppDispatch } from '../../redux/Hooks'

import createUser from '../../redux/reducer/User/Actions/createUser'

import {Formik, Form,Field,ErrorMessage} from "formik"
import * as yup from "yup"

interface registerFormI{
  setOpenRegister:Function
}

const RegisterForm:FC<registerFormI>=({setOpenRegister})=> {
  const dispatch = useAppDispatch()
  
  const registerSchema = yup.object().shape({
    name:yup.string().min(2,"Nombre muy corto").max(20,"Nombre muy largo").required("Tu nombre es requerido"),
    email: yup.string().email("Ese email no existe").required("Tu email es requerido"),
    password: yup.string().min(5,"Too short").max(13,"Too long").required("Password required"),
    password_2: yup.string().test("compare","Passwords are not equal",(value:any,testContext:any):any=>{
      if(testContext.parent.password === value) return true
      else return false
    }).required("Repeat password")
  })
  
  const handleSubmit = async(values:registerForm,submitProps:any)=>{
   
    const res = await dispatch(createUser(values))
    if(!res?.error?.message?.length){
      submitProps.resetForm()
      setOpenRegister(false)
    }
    
    
  }

  return (
    <div className={styles.cointainer}>
      <div className={styles.wrapper_form}>
          <Formik
            initialValues={{name:"",email:"",password:"",password_2:""}}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}            
          >

            {({values,isSubmitting,handleChange,isValid})=>(
              <Form className={styles.form} >
                <span style={{color:"white"}}>Regsiter</span>
                <Field type="text" name="name" placeholder="Name"  />
                <ErrorMessage name='name' className={styles.errorMsg} component="span"/>

                <Field type="text" name="email" placeholder="Email"/>
                <ErrorMessage name='email' className={styles.errorMsg} component="span"/>

                <Field type="password" name="password" placeholder="password"/>
                <ErrorMessage name='password' className={styles.errorMsg} component="span"/>

                <Field type="password" name="password_2" placeholder="repeat password"/>
                <ErrorMessage name='password_2' className={styles.errorMsg} component="span"/>

                <button type='submit' className={styles.button} disabled={!isValid || isSubmitting}>Submit</button>
              </Form>
            )}
          </Formik>
      </div>
    </div>
  )
}


export default RegisterForm