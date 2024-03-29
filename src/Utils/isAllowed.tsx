import { Navigate ,Outlet} from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../redux/Hooks";
import axiosPriv from "../api/axios";
import { useEffect, useState } from "react";



const IsAllowed = ()=>{
    const dispatch = useAppDispatch()
    const {user,status} = useAppSelector((state)=> state.UserReducer)
    // const [allow,setAllow] = useState(true)
    // useEffect(()=>{
    //     const callUser = async()=>{
    //         const {data} = await axiosPriv.get("/user")
    //         if(data?.user?.name.length > 1){
    //             console.log(data)
    //             console.log("ALLAOSDFASDF")
    //             setAllow(true)
    //             console.log(allow)
    //         }else{
    //             setAllow(false)
    //         }       
    //     }
    //     callUser()
    // },[dispatch])
    
    // if(status === "loading"){
    //     return <h1>Wait</h1>
    // }

    if(user?.email?.length){
        return <Outlet/>
    }else{
        return <Navigate to={"/Home"}   />
    }


}

export default IsAllowed