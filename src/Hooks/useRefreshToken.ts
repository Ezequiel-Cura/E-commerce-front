import axios from "axios"
import { useAppDispatch } from "../redux/Hooks"
import refreshToken from "../redux/reducer/User/Actions/refreshToken"




export default async function useRefreshToken(){
    const dispatch = useAppDispatch()

    const response = await refreshToken()
    
     
}