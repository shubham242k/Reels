import { useContext } from "react";
import {authContext} from "./AuthProvider";
import { auth } from "./firebase";
import {Redirect} from "react-router-dom";
import "./Home.css"
import VideoCard from "./VideoCard"
let Home = () =>{
    let user = useContext(authContext);
    return(
        <>
            {user ? "" : <Redirect to="/login" />}
            <div className ="main-container ">
                <div className = "video-container">
                    <VideoCard/>
                </div>
                <div className = "video-container">
                    <VideoCard/>
                </div>
                <div className = "video-container">
                    <VideoCard/>
                </div>
                <div className = "video-container">
                    <VideoCard/>
                </div>
                <div className = "video-container">
                    <VideoCard/>
                </div>
                <div className = "video-container">
                    <VideoCard/>
                </div>
                <div className = "video-container">
                    <VideoCard/>
                </div>
                <div className = "video-container">
                    <VideoCard/>
                </div>
                <div className = "video-container">
                    <VideoCard/>
                </div>
            </div>
            <button className ="btn btn-primary m-4 logout-button" onClick = {()=>{
                    auth.signOut();
                }}>Logout
            </button>
        </>
    )
}

export default Home;