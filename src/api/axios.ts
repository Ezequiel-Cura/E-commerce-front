import axios from "axios";
import { AxiosRequestConfig } from "axios";
// import { useAppSelector,useAppDispatch } from "../redux/Hooks";
import refreshToken from "../redux/reducer/User/Actions/refreshToken";

const BASE_URL = 'http://localhost:5000'

const axiosPriv = axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Type': 'application/json'},
    withCredentials:true
})




axiosPriv.interceptors.request.use(
    (config:AxiosRequestConfig)=>{
        
        config.headers = config.headers ?? {};
        
        if(!config?.headers['Authorization']){
            config.headers['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`
        }
        return config
    },(error)=>{
        console.log(error)
        Promise.reject(error)
    }
)
    
    
axiosPriv.interceptors.response.use(
    response=>response,
    async(error)=>{
        const prevRequest = error?.config;
        

        if(error?.response.status === 403 && !prevRequest?.sent){
            prevRequest.sent = true
            const newAccessToken = await refreshToken()
            prevRequest.headers['Authorization'] =`Bearer ${newAccessToken}`
            return axios(prevRequest)
        }
        return Promise.reject(error)
    }
)

  

export default axiosPriv;
    // export const axiosPrivate = axios.create({
    //     baseURL:BASE_URL,
    //     headers:{'Content-Type': 'application/json'},
    //     withCredentials:true
    // })