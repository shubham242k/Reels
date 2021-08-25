import { useContext, useEffect,useState } from "react";
import { authContext } from "./AuthProvider";
import {postContext} from "./Home";
import {firestore} from "./firebase"
import "./InfoSection.css";
import timeDifference from "./DateGenerator";
let InfoSection = ()=>{
    let user = useContext(authContext);
    let postData = useContext(postContext);
    let[currentComment,setCurrentComment] = useState("");
    let[comments,setComments] = useState([]);
    useEffect(()=>{
        
        let f = async()=>{
            let commentArr = postData.comments;
            let arr = [];
            
            for(let i = 0;i<commentArr.length;i++){
                
                let commentDoc = await firestore.collection("comments").doc(commentArr[i]).get();
                arr.push({commentId : commentArr[i] ,...commentDoc.data()});
            }
            setComments(arr);
        }
        f();
    },[postData])
    return(
        <div className ="info-section">
            <div className = "post-info">
                <p className = "m-3 post-by-name">{postData.name}</p>
                <span className = "time-of-upload">{timeDifference(postData.uploadTime)}</span>
            </div>
            <div className ="line-breaker"></div>
            <div className ="comment-section">
                <div className = "comment-view">
                    {
                        comments.map((el)=>{
                            
                            return(
                                <>
                                <div className = "per-comment" commentId={el.commentId} >
                                    <div className = "comment-and-info">
                                        <div>
                                            <img src={el.photo}
                                            className = "comments-profile-image"/>
                                        </div>
                                        <div className = "name-comment-container">
                                            <span className = "comments-username">{el.name}</span>
                                            <p className ="actual-comment ">{el.comment}</p>
                                        </div>
                                    </div>
                                   {(user && el.commentById == user.uid)?
                                        <div onClick = {async()=>{
                                            await firestore.collection("comments").doc(el.commentId).delete();

                                            let postDoc = await firestore.collection("posts").doc(postData.id).get();
                                            let postCommentsArray = postDoc.data().comments;

                                            let arr = postCommentsArray.filter((commentId) =>{
                                                return (commentId !== el.commentId)
                                            })

                                            await firestore.collection("posts").doc(postData.id).update({
                                                comments : arr
                                            })
                                            
                                        }}>
                                            <span class="material-icons-round delete-comment">clear</span>
                                        </div>
                                    :""}

                                </div>
                                <div className = "line-breaker-comment"></div>
                                </>
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
                        if(e.key == "Enter" && currentComment !== ""){
                            let docRef = await firestore.collection("comments").add({
                                name : user.displayName,
                                comment : currentComment,
                                photo : user.photoURL,
                                commentById : user.uid
                            })

                            setCurrentComment("");
                            let doc = await docRef.get();

                            let commentId = doc.id;

                            let postDoc = await firestore.collection("posts").doc(postData.id).get();

                            let postCommentsArray = postDoc.data().comments;

                            postCommentsArray.push(commentId);

                            await firestore.collection("posts").doc(postData.id).update({
                                comments : postCommentsArray
                            })
                        }
                    }}/>
                </div>
            </div>
        </div>

    )
}

export default InfoSection;