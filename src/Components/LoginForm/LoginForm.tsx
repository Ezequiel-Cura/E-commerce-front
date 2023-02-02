import React,{useState,useEffect} from 'react'
import { useAppDispatch } from '../../redux/Hooks'
import { loginForm } from '../../Interfaces/loginINterface'
//CSS
import styles from "./LoginForm.module.css"



import {Formik, Form,Field,ErrorMessage} from "formik"
import * as yup from "yup"
import login from '../../redux/reducer/User/Actions/login'


export default function LoginForm() {
    const dispatch = useAppDispatch()

    const loginSchema = yup.object().shape({
        mail: yup.string().email("Ese email no existe").required("Tu email es requerido"),
        password: yup.string().min(5,"Too short").required("Password required")
      })


      const handleSubmit = async(values:loginForm,submitProps:any)=>{
        console.log("holaaaaaaaaa")
        const res = await dispatch(login(values))
        
        if(!res?.error?.message?.length){
            submitProps.resetForm()
        }
        
      }

    return (
         <div className={styles.cointainer}>
            <div className={styles.wrapper_form}>
                
                <Formik  
                    initialValues={{email:"",password:""}}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >

                    {({values,isSubmitting,handleChange,isValid})=>(
                        <Form className={styles.form}>
                            <span style={{color:"white"}}>Login</span>                              
                
                            <Field type="text" name="email" placeholder="Email"  />
                            <ErrorMessage name='email' className={styles.errorMsg} component="span"/>

                            <Field type="password" name="password" placeholder="password" />
                            <ErrorMessage name='password' className={styles.errorMsg} component="span"/>

                            <button type="submit" className={styles.button} disabled={!isValid || isSubmitting}>Submit</button>
                        </Form>
                    )}
                </Formik>
                   
            </div>
         </div>
    )
}
