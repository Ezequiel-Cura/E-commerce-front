import React,{useEffect} from 'react'

// import { useAppDispatch,useAppSelector } from './redux/Hooks';
// import getUserInfo from './redux/reducer/User/Actions/getUserInfo';
// import UserPage from './Components/UserPage/UserPage';

import { useAppDispatch,useAppSelector } from '../../redux/Hooks';
import getUserInfo from '../../redux/reducer/User/Actions/getUserInfo';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';

export default function Home() {
  // const axiosPrivate = useAxiosPrivate();


  const dispatch = useAppDispatch()
  const user = useAppSelector(state=> state.UserReducer.user)
  

  useEffect(()=>{
    console.log("adiosssssssss")
    
    
    if(!user?.email){
      console.log("hola")
      dispatch(getUserInfo())
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
        </div>
    </div>
  )
}
