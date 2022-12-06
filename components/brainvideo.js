// import React, {useState} from 'react';
// import ReactPlayer from 'react-player';
import styles from './brainvideo.module.scss'
import ReactPlayer from 'react-player'
import Image from 'next/image'
// import startVideo from '../video/01-main-menu.mp4'
// import video1 from '../video/button1.mp4'
// import video2 from '../video/button2.mp4'
// import video3 from '../video/button3.mp4'
// import video4 from '../video/button4.mp4'
import { useState } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function BrainVideo() {
    const handle = useFullScreenHandle();
    const startVideo = '../video/01-main-menu.mp4'
    const video1 = '../video/button1.mp4'
    const video2 = '../video/button2.mp4'
    const video3 = '../video/button3.mp4'
    const video4 = '../video/button4.mp4'
    const video5 = '../video/button5.mp4'
    const video6 = '../video/button6.mp4'

    
    const [playing, setPlaying] = useState(true);
    const [urlVideo, setUrlVideo] = useState(startVideo);
    const [isShowBtn, setIsShowBtn] = useState(true);    
    const [videoStep, setVideoStep] = useState(0);    

    function actionBtn1() {
        setUrlVideo(video1);
        setIsShowBtn(false);
        setVideoStep(1)
    }
    function actionBtn2() {
        setUrlVideo(video2);
        setIsShowBtn(false);
        setVideoStep(2)
    }
    function actionBtn3() {
        setUrlVideo(video3);
        setIsShowBtn(false);
        setVideoStep(3)
    }
    function actionBtn4() {
        setUrlVideo(video4);
        setIsShowBtn(false);
        setVideoStep(4)
    }
    function reset() {      
        if (videoStep == 4) {
            setUrlVideo(video5);
            setVideoStep(5)
        } else if (videoStep == 5) {
            setUrlVideo(video6);
            setVideoStep(6)
        }      
        else if (videoStep == 6) {
            setTimeout(function(){
                setUrlVideo(startVideo);
                setIsShowBtn(true);
           }, 3500);
        }
        else {
            setTimeout(function(){
                setUrlVideo(startVideo);
                setIsShowBtn(true);
           }, 1500);
        }
    }
    return (
        <FullScreen handle={handle}>
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
            <div className={isShowBtn ? styles.show : styles.hidden}>
                <Image
                    className={styles.video_main_img}
                    src="/video/video-main-menu.png"
                    alt="VIDEO MENU"
                    // layout="fill"
                    // objectFit="cover"
                    width={2024}
                    height={1138}
                />
                <Image
                    className={styles.video_main_img_blink}
                    src="/video/video-main-menu-blink.png"
                    alt="VIDEO MENU"
                    // layout="fill"
                    // objectFit="cover"
                    width={2024}
                    height={1138}
                />
            </div>
            <div className={isShowBtn ? styles.show : styles.hidden}>
                <div className={styles.text_equipment_1}>
                    <p>Monitor Interface Cable</p>
                </div>
                <div className={styles.text_equipment_2}>
                    <p>Chanel Monitor</p>
                </div>
                <div className={styles.text_equipment_3}>
                    <p>Chanel Module</p>
                </div>
                <div className={styles.text_equipment_4}>
                    <p>Patient Interface Cable (PIC)</p>
                </div>
                <div className={styles.text_equipment_5}>
                    <p>Bispectral Index Sensors</p>
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
        </FullScreen>
    )
}