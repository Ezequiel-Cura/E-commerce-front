import axios from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAppSelector , useAppDispatch} from "../redux/Hooks";
import refreshToken from "../redux/reducer/User/Actions/refreshToken";
import { AxiosRequestConfig } from "axios";


const useAxiosPrivate = ()=>{
    const dispatch = useAppDispatch()
    const user = useAppSelector(state=>state.UserReducer.user)
    
    console.log("INSIDE USEAXIOSPRIVATE")
    useEffect(()=>{

        const requestIntercept = axios.interceptors.request.use(
            (config:AxiosRequestConfig)=>{
                config.headers = config.headers ?? {};
                
                if(!config?.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${user.token}`
                }
                return config
            },(error)=>{
                Promise.reject(error)
            }
        )


        const responseIntercept = axios.interceptors.response.use(
            response=>response,
            async(error)=>{
                const prevRequest = error?.config;
                if(error?.response.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true
                    const newAccessToken = await dispatch(refreshToken())
                    prevRequest.headers['Authorization'] =`Bearer ${newAccessToken}`
                    return axios(prevRequest)
                }
                return Promise.reject(error)
            }
        )
        
        return ()=>{
            axios.interceptors.request.eject(requestIntercept)
            axios.interceptors.response.eject(responseIntercept)

        }
    },[user])

    return axios
}

export default useAxiosPrivate