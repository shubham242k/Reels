import { useEffect, useState} from "react"
import { auth,firebaseStorage, firestore} from "../firebase";
import "./SideBar.css"
import { useContext} from "react";
import {authContext} from "../AuthProvider";

let SideBar = () =>{
    let user = useContext(authContext);
    let [isCollapsed,SetSideBar] = useState(true);
    let [photoUrl,setPhotoUrl] = useState("");
    let [displayName,setDisplayName] = useState("");
    useEffect(()=>{
        setPhotoUrl(user.photoURL);
        setDisplayName(user.displayName);

    },[]);
    return(
        <div className ={`side-bar ${isCollapsed?"collapsed" : ""}`} 
        onClick ={()=>{
            SetSideBar(!isCollapsed);

        }}>
            
            <div className = "top-section">
                <div className = {`profile-photo`}>
                    <img src={photoUrl} alt="profile-image" className = {`${isCollapsed?"collapsed" : ""}`}/>
                </div>
                {!isCollapsed ? <div className="user-name">{displayName}</div>:""}
                <div className = "line-breaker2"></div>
            </div>

            
            <div className = "bottom-section">
                <div className = {`menu-item ${isCollapsed?"collapsed" : ""}`}>
                    <input type="file" id="file"
                        onClick = {(e)=>{
                            e.currentTarget.value = null;
                        }}
            
                        onChange = {(e) =>{
                            let videoObject = e.currentTarget.files[0];
                            let {name,type,size} = videoObject;
            
                            if(size/1000000 > 40){
                                alert("File size exceeds 10mb");
                                return;
                            }
                            if(type.split("/")[0] !== "video"){
                                alert("Please upload a video");
                                return;
                            }
                            
                            let uploadTask = firebaseStorage.
                                ref(`/posts/${user.uid}/${Date.now() + "-" + name}`).put(videoObject);
            
                            uploadTask.on("state_changed",null,null,()=>{
                                uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                                    firestore.collection("posts").add({
                                        name: user.displayName,
                                        url,
                                        likes:[],
                                        comments :[],
                                        uploadTime : Date.now()
                                    })
                                })
                            })
                        }}/>
                    <label htmlFor="file">
                        <div className = "icons">
                            <span class="material-icons-round">upload</span>
                        </div>
                        {!isCollapsed ? <span className="text-span">Upload</span>:""}
                    </label>
                    
                </div>
                <div className = {`menu-item ${isCollapsed?"collapsed" : ""}`}
                onClick = {()=>{
                    auth.signOut();
                }}>
                    <div className = "icons">
                        <span class="material-icons-round">logout</span>
                    </div>
                    {!isCollapsed ? <span className="text-span">Logout</span>:""}
                </div>
            </div>
        </div>
    );
}

export default SideBar;


                