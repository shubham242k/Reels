import { useContext, useEffect } from "react";
import {authContext} from "./AuthProvider";
import {firebaseStorage, firestore} from "./firebase";
let UploadButton = () =>{
    let user = useContext(authContext);
    return(
        <input className ="btn btn-primary m-4 upload-button" 
            type = "file"
            onClick = {(e)=>{
                e.currentTarget.value = null;
            }}

            onChange = {(e) =>{
                // console.log(e.currentTarget.files);
                let videoObject = e.currentTarget.files[0];
                let {name,type,size} = videoObject;

                if(size/1000000 > 10){
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
                            comments :[]
                        })
                    })
                })

                e.currentTarget.value = null;
            }}
        />
    )
}

export default UploadButton;