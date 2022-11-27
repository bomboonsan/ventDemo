// import React, {useState} from 'react';
// import ReactPlayer from 'react-player';
import styles from './brainvideo.module.scss'
import ReactPlayer from 'react-player';
// import startVideo from '../public/video/01-main-menu.mp4'
// import video1 from '../public/video/button1.mp4'
// import video2 from '../public/video/button2.mp4'
// import video3 from '../public/video/button3.mp4'
// import video4 from '../public/video/button4.mp4'
import { useState , useEffect } from 'react';

export default function BrainVideo() {
    const [playing, setPlaying] = useState(true);
    // const [urlVideo, setUrlVideo] = useState('');
    // const [isShowBtn, setIsShowBtn] = useState(true);
    // useEffect(() => setUrlVideo('../public/video/01-main-menu.mp4'), [])
    function reset() {        
        setTimeout(function(){
            setUrlVideo(startVideo);
            setIsShowBtn(true);
       }, 500);
    }
    return (

        <div className={styles.video_container}>

            <ReactPlayer 
            className={styles.video_item} 
            url='../video/button1.mp4'
            playing={playing} 
            onEnded={reset}
            width='100%'
            height='100%'
            />
        </div>
        
    )
}