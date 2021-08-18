import { useContext } from "react";
import {authContext} from "./AuthProvider";
import { auth } from "./firebase";
import {Redirect} from "react-router-dom";

let Home = () =>{
    let user = useContext(authContext);
    return(
        <>
            {user ? "" : <Redirect to="/login" />}
            <div>Home</div>
            <button onClick = {()=>{
                    auth.signOut();
                }}>Logout
            </button>
        </>
    )
}

export default Home;