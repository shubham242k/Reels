import { useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";
import { firestore } from "./firebase";
import MusicDisplay from "./MusicDisplay";

import "./VideoCard.css"
let VideoCard = (props) =>{
    let user = useContext(authContext);
    let[videoState,setVideoState] = useState(false);
    let[currentComment,setCurrentComment] = useState("");
    let[comments,setComments] = useState([]);

    useEffect(()=>{
       let f = async()=>{
           let commentArr = props.data.comments;
           let arr = [];

           for(let i = 0;i<commentArr.length;i++){
               let commentDoc = await firestore.collection("comments").doc(commentArr[i]).get();
               console.log(commentDoc.data());
               arr.push(commentDoc.data());
           }

           setComments(arr);
       }
       f();
    },[props])
    return (
        <div className="video-card">
            {videoState ? <MusicDisplay/> : ""}
            <div className = "like-button">
                <span class="material-icons-outlined ">
                favorite_border
                </span>
            </div>
            <video 
            className ="video-section" 
            src={props.data.url}
            loop
            
            onClick = {
                (e)=>{
                    if(videoState){
                        e.currentTarget.pause();
                        setVideoState(false);
                    }else{
                        e.currentTarget.play();
                        setVideoState(true);
                    }
                }
            }>
            </video>
            
            <div className ="info-section">
                <p className = "m-3 post-by-name">{props.data.name}</p>
                <div className ="line-breaker"></div>
                <div className ="comment-section">
                    <div className = "comment-view">
                        {
                            comments.map((el)=>{
                                return(
                                    <div className = "per-comment">
                                        <div>
                                            <img src={el.photo}
                                                className = "comments-profile-image"/>
                                        </div>
                                        <div className = "name-comment-container">
                                            <span className = "comments-username">{el.name}</span>
                                            <p className ="actual-comment ">{el.comment}</p>
                                        </div>
                                        
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    
                    <div className="comment-form input-group">
                        <input type="text" class=" form-control" placeholder="Add a comment"
                        value = {currentComment}
                        onChange = {(e)=>{
                            setCurrentComment(e.currentTarget.value);
                        }}
                        onKeyDownCapture = {async(e)=>{
                            if(e.key == "Enter"){
                                let docRef = await firestore.collection("comments").add({
                                    name : user.displayName,
                                    comment : currentComment,
                                    photo : user.photoURL
                                })

                                setCurrentComment("");
                                let doc = await docRef.get();

                                let commentId = doc.id;

                                let postDoc = await firestore.collection("posts").doc(props.data.id).get();

                                let postCommentsArray = postDoc.data().comments;

                                postCommentsArray.push(commentId);

                                await firestore.collection("posts").doc(props.data.id).update({
                                    comments : postCommentsArray
                                })
                            }
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VideoCard;