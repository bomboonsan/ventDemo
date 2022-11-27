// import React, {useState} from 'react';
// import ReactPlayer from 'react-player';
import styles from './brainvideo.module.scss'
import ReactPlayer from 'react-player'
// import startVideo from '../video/01-main-menu.mp4'
// import video1 from '../video/button1.mp4'
// import video2 from '../video/button2.mp4'
// import video3 from '../video/button3.mp4'
// import video4 from '../video/button4.mp4'
import { useState } from 'react';

export default function BrainVideo() {
    const startVideo = '../video/01-main-menu.mp4'
    const video1 = '../video/button1.mp4'
    const video2 = '../video/button2.mp4'
    const video3 = '../video/button3.mp4'
    const video4 = '../video/button4.mp4'

    
    const [playing, setPlaying] = useState(true);
    const [urlVideo, setUrlVideo] = useState(startVideo);
    const [isShowBtn, setIsShowBtn] = useState(true);    

    function actionBtn1() {
        setUrlVideo(video1);
        setIsShowBtn(false);
    }
    function actionBtn2() {
        setUrlVideo(video2);
        setIsShowBtn(false);
    }
    function actionBtn3() {
        setUrlVideo(video3);
        setIsShowBtn(false);
    }
    function actionBtn4() {
        setUrlVideo(video4);
        setIsShowBtn(false);
    }
    function reset() {        
        setTimeout(function(){
            setUrlVideo(startVideo);
            setIsShowBtn(true);
       }, 500);
    }
    return (

        <div className={styles.video_container}>

            <div className={isShowBtn ? styles.show : styles.hidden}>
                <div 
                onClick={actionBtn1}
                className={styles.video_btn1}>
                </div>
            </div>

            <div className={isShowBtn ? styles.show : styles.hidden}>
                <div 
                onClick={actionBtn2}
                className={styles.video_btn2}>
                </div>
            </div>

            <div className={isShowBtn ? styles.show : styles.hidden}>
                <div 
                onClick={actionBtn3}
                className={styles.video_btn3}>
                </div>
            </div>

            <div className={isShowBtn ? styles.show : styles.hidden}>
                <div 
                onClick={actionBtn4}
                className={styles.video_btn4}>
                </div>
            </div>

            <ReactPlayer 
            className={styles.video_item} 
            url={urlVideo}  
            playing={playing} 
            onEnded={reset}
            width='100%'
            height='100%'
            />
        </div>
        
    )
}