import {signInWithGoogle } from "./firebase"
import {authContext} from "./AuthProvider";
import {Redirect} from "react-router-dom";
import { useContext } from "react";
let Login = () =>{

    let user = useContext(authContext);

    return(
        <>
            {user ? <Redirect to="/" /> : ""}
            <button type="button" className="btn btn-primary login-button"
                onClick = {
                    ()=>{
                        signInWithGoogle();
                    }
                }>Login Using Google
            </button>
        </>
    )
}

export default Login