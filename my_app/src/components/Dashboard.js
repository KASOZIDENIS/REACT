import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout} from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { LogoutSuccessToast} from "./Helper";
import Homepage from "./Homepage";

function Dashboard() {// eslint-disable-next-line 
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {

    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  async function handleLogout(e){
    e.preventDefault();
    var response = await logout();
    if(response === true){
     LogoutSuccessToast("Logged out Suesfully");
      navigate("/login");
    }
  }
  
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/access_denied");
    fetchUserName();// eslint-disable-next-line 
  }, [user, loading]);

  return (
    <div className="dashboard">
       <button className="dashboard__btn" onClick={(e)=>handleLogout(e)}  style={{ display: 'grid', justifyContent: 'end' }}>
          Logout
         </button>
       <div className="dashboard__container">
       
        YOU ARE WELCOME -
         {name}
        
         {/* <div>{user?.email}</div> */}
         
         <Homepage/>
       </div>
     </div>
  );
}
export default Dashboard;