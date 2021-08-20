import { useContext, useEffect, useState } from "react";
import {authContext} from "./AuthProvider";
import { auth, firestore} from "./firebase";
import {Redirect} from "react-router-dom";
import "./Home.css"
import VideoCard from "./VideoCard"
import UploadButton from "./UploadButton";
let Home = () =>{
    let user = useContext(authContext);
    let [posts,setPosts] = useState([]);
    useEffect(()=>{
        let unsub = firestore.collection("posts").onSnapshot((querySnapShot)=>{
            let docArr = querySnapShot.docs;
            let arr = [];
            console.log(docArr);
            for(let i = 0;i<docArr.length;i++){
                arr.push({
                    id : docArr[i].id,
                    ...docArr[i].data()
                })
            }

            setPosts(arr);
            
        });

        return(()=>{
            unsub();
        });
    },[])
    return(
        <>
            {user ? "" : <Redirect to="/login" />}
            
        <div className ="main-body">
            <div className = "content-section">
                <div className ="main-container ">
                    {
                        posts.map((element)=>{
                            return(
                                <div className = "video-container">
                                    <VideoCard key = {element.id} data = {element}/>
                                </div>
                            )
                        })
                    }
                </div>
            
            </div>
            <div className = "user-menu">
                <button className ="btn btn-primary m-4 logout-button" onClick = {()=>{
                        auth.signOut();
                    }}>Logout
                </button>
                <UploadButton/>
                
            </div>
        </div>
            
        </>
    )
}

export default Home;