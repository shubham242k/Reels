import { useContext, useEffect,useState } from "react";
import { authContext } from "./AuthProvider";
import { firestore } from "./firebase";
import {postContext} from "./Home"
 
let LikeButton = () =>{
    let user = useContext(authContext);
    let postData = useContext(postContext);
    let[isLiked,setLiked] = useState(false);
    useEffect(()=>{
       let f = async()=>{
            let postDoc = await firestore.collection("posts").doc(postData.id).get();
           let likeArr = postDoc.data().likes;

           if(likeArr.includes(user.uid)) setLiked(true);
           else setLiked(false);
        }
        f();
    },[postData])
    let addLike = async() =>{
        setLiked(!isLiked);
        let postDoc = await firestore.collection("posts").doc(postData.id).get();

        let likeArr = postDoc.data().likes;

        likeArr.push(user.uid);
        await firestore.collection("posts").doc(postData.id).update({
            likes : likeArr
        })
    }
    let removeLike = async() =>{
        setLiked(!isLiked);
        let postDoc = await firestore.collection("posts").doc(postData.id).get();

        let likeArr = postDoc.data().likes;

        let arr = likeArr.filter((currLikeId)=>{
            return (currLikeId !== user.uid);
        })
        
        await firestore.collection("posts").doc(postData.id).update({
            likes : arr
        })

    }
    return(
        <div className = "like-button" 
        onClick = {isLiked?removeLike:addLike}>
                <span class="material-icons-outlined ">
                {isLiked?"favorite":"favorite_border"}
                </span>
        </div>
    )
}

export default LikeButton;