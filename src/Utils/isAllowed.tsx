import { Navigate ,Outlet} from "react-router-dom";
import { useAppSelector } from "../redux/Hooks";

const IsAllowed = ()=>{
    const user = useAppSelector((state)=> state.UserReducer.user)

    if(user?.name){
        return <Outlet/>
    }else{
        return <Navigate to={"/Home"}   />
    }


}

export default IsAllowed