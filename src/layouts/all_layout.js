import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { UserContext } from "../contexts/user_context";
import { getUser } from "../utils/local_storage";
import { getMyInfo } from "../controllers/user_controller";
import {Spinner} from "react-bootstrap"

const AllLayout = () => {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const data = getUser()
   useEffect(() => {
      setLoading(true)
      getMyInfo().then((data)=>{
        console.log(data)
        setUser(data)
        setLoading(false)
      })
   }, [refresh]);
    return ( <div>
     <UserContext.Provider value={{ user,setUser,refresh,setRefresh }} >
      {/* {user?user.name:"no user"} */}
     <div><Toaster position="top-right"/></div>
   <Outlet/>
     

     </UserContext.Provider>
    </div>);
}
 
export default AllLayout;