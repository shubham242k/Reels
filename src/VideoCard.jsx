import {useState } from "react";
import MusicDisplay from "./MusicDisplay";
import LikeButton from "./LikeButton";
import "./VideoCard.css"
import InfoSection from "./InfoSection";

let VideoCard = (props) =>{
    let[videoState,setVideoState] = useState(false);
    
    return (
        <div className="video-card">
            {videoState ? <MusicDisplay/> : ""}
            <LikeButton/>
            <video 
            autoPlay
            muted
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
            <InfoSection/>
        </div>
    )
}


export default VideoCard;