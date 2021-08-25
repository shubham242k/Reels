import { createContext, useContext, useEffect, useState } from "react";
import {authContext} from "./AuthProvider";
import {firestore} from "./firebase";
import {Redirect} from "react-router-dom";
import "./Home.css"
import VideoCard from "./VideoCard"
import SideBar from "./SideMenu/SideBar";

export const postContext = createContext();
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
        <div className="main-body">
            <SideBar></SideBar> 
            <div className ="main-body-reel-section">
                <div className = "content-section">
                    <div className ="main-container ">
                        {
                            posts.map((element)=>{
                                return(
                                    <postContext.Provider value = {element}>
                                        <div className = "video-container">
                                            <VideoCard key = {element.id} data = {element}/>
                                        </div>
                                    </postContext.Provider>
                                )
                            })
                        }
                    </div>
                
                </div>
            </div>
            
        </div>
            
        </>
    )
}

export default Home;