import { useState } from "react";
import MusicDisplay from "./MusicDisplay";

import "./VideoCard.css"
let VideoCard = () =>{
    let[videoState,setVideoState] = useState(false);
    // videoState = true => playing, false => pause
    return (
        <div className="video-card">
            {videoState ? <MusicDisplay/> : ""}
            
            <video 
            className ="video-section" 
            src="https://player.vimeo.com/external/473887358.sd.mp4?s=34ae48ecca4120bcc798e684ecd20cd2cd3d1401&amp;profile_id=165&amp;oauth2_token_id=57447761"
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
                <p className = "m-3 post-by-name">Shubham Aggarwal</p>
                <div className ="line-breaker"></div>
                <div className ="comment-section">
                    <div className = "comment-view"></div>
                    <div className="comment-form input-group">
                        <input type="text" class=" form-control" placeholder="Add a comment"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VideoCard;