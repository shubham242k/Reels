import {useEffect, useRef, useState } from "react";
import LikeButton from "./LikeButton";
import "./VideoCard.css"
import InfoSection from "./InfoSection";

let VideoCard = (props) =>{
    let[videoState,setVideoState] = useState(false);
    const ref = useRef(null);
     
    useEffect(()=>{
        let observer = new IntersectionObserver((elements)=>{
            if(elements[0].intersectionRatio >= 0.5){
                setVideoState(!videoState);
                ref.current.play();
            }else{
                setVideoState(!videoState);
                ref.current.pause();
            }
        },{
            root : null,
            rootMargin : "0px",
            threshold:[0.5]
        }); 
        if(ref.current)
            observer.observe(ref.current);

        return()=>{
            if(ref.current) observer.unobserve(ref.current)
        }
    },[]) 
    
    // console.log(ref);
    
    return (
        <div className="video-card">
            <LikeButton/>
            <video 
            ref = {ref}
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