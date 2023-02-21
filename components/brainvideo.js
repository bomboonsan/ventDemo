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
import { useState , useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useRouter } from 'next/router'

// ที่กระพริบทีละอัน


export default function BrainVideo() {
    const router = useRouter()
    const handle = useFullScreenHandle();
    const startVideo = '../video/01-main-menu.mp4-blank'
    // const startVideo = 'https://www.youtube.com/watch?v=zm8_SDEYjtw'
    // const video1 = '../video/button1.mp4'
    // const video2 = '../video/button2.mp4'
    // const video3 = '../video/button3.mp4'
    // // const video4 = '../video/button4.mp4'
    // const video4 = '../video/videoend2.mp4'
    const video1 = 'https://wish-integrate.com/bisvideo/1.mp4'
    const video2 = 'https://wish-integrate.com/bisvideo/2.mp4'
    const video3 = 'https://wish-integrate.com/bisvideo/3.mp4'
    const video4 = 'https://wish-integrate.com/bisvideo/4.mp4'

    
    // const [playing, setPlaying] = useState(true);
    const [playing, setPlaying] = useState(true);
    const [urlVideo, setUrlVideo] = useState(startVideo);
    const [isShowBtn, setIsShowBtn] = useState(true);    
    const [videoStep, setVideoStep] = useState(0);

    useEffect(() => {
        document.querySelector('#actionBtn1')?.classList.add(styles['visible']);
    }, []);

    function actionBtn1() {
        getFullScreen()
        setUrlVideo(video1);
        setIsShowBtn(false);
        setVideoStep(1);        
    }
    function actionBtn2() {
        getFullScreen()
        setUrlVideo(video2);
        setIsShowBtn(false);
        setVideoStep(2)
    }
    function actionBtn3() {
        getFullScreen()
        setUrlVideo(video3);
        setIsShowBtn(false);
        setVideoStep(3)
    }
    function actionBtn4() {
        getFullScreen()
        setUrlVideo(video4);
        setIsShowBtn(false);
        setVideoStep(4)
    }
    function nextStepCircle () {
        const videoNextStepVar = videoStep+1;
        document.querySelector('#actionBtn'+videoStep)?.classList.remove(styles['visible']);
        document.querySelector('#actionBtn'+videoStep)?.classList.add(styles['invisible']);
        document.querySelector('#actionBtn'+videoNextStepVar)?.classList.remove(styles['invisible']);
        document.querySelector('#actionBtn'+videoNextStepVar)?.classList.add(styles['visible']);
        console.log('videoStep'+videoStep);
        console.log('videoNextStep'+videoNextStepVar);
    }
    function reset() {        
        // if (videoStep == 4) {
        //     setUrlVideo(video5);
        //     setVideoStep(5)
        // } else if (videoStep == 5) {
        //     setUrlVideo(video6);
        //     setVideoStep(6)
        // }      
        // else if (videoStep == 6) {
        //     setTimeout(function(){
        //         setUrlVideo(startVideo);
        //         setIsShowBtn(true);
        //         router.push('/brain/result/howto')
        //    }, 3500);
        // }
        // else {
        //     setTimeout(function(){
        //         setUrlVideo(startVideo);
        //         setIsShowBtn(true);
        //    }, 1500);
        // }
        if ( videoStep == 4) {
            // router.push('/mainbrain')
            // document.exitFullscreen();
            // router.push('/brain/result/howto')
            // router.push('/mainbrain')
            setUrlVideo(startVideo);
            // setIsShowBtn(true);
            document.querySelector('#btn_finish')?.classList.add(styles['visible']);
        }
        setTimeout(function(){
            setUrlVideo(startVideo);
            setIsShowBtn(true);
       }, 200);
       setTimeout(function(){
            nextStepCircle()
        }, 300);
    }
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
    }
    function getFullScreen() {
        document.documentElement.requestFullscreen();
    }
    function handleFinish() {
        router.push('/mainbrain')
    }
    return (
        <FullScreen handle={handle}>
        <div className={styles.video_container}>

            <div id='actionBtn1' className={isShowBtn ? styles.showBtn : styles.hidden}>
                <div 
                onClick={actionBtn1}
                className={styles.video_btn1}>
                </div>
            </div>

            <div id='actionBtn2' className={isShowBtn ? styles.showBtn : styles.hidden}>
                <div 
                onClick={actionBtn2}
                className={styles.video_btn2}>
                </div>
            </div>

            <div id='actionBtn3' className={isShowBtn ? styles.showBtn : styles.hidden}>
                <div 
                onClick={actionBtn3}
                className={styles.video_btn3}>
                </div>
            </div>

            <div id='actionBtn4' className={isShowBtn ? styles.showBtn : styles.hidden}>
                <div 
                onClick={actionBtn4}
                className={styles.video_btn4}>
                </div>
            </div>
            <div id='btn_finish' className={styles.btn_group}>                
                <button onClick={handleFinish}>
                    FINISH
                </button>
            </div>
            <div className={isShowBtn ? styles.show : styles.hidden}>
                <Image
                    className={styles.video_main_img}
                    // src="/video/button7_Moment.jpg"
                    src="/video/video-main-menu2.png"
                    // src="/video/bgnew.jpg"
                    alt="VIDEO MENU"
                    // layout="fill"
                    // objectFit="cover"
                    width={2024}
                    height={1138}
                />
                <Image
                    className={styles.video_main_img_blink}
                    src="/video/video-main-menu-blink.png"
                    // src="/video/bgnew.jpg"
                    alt="VIDEO MENU"
                    // layout="fill"
                    // objectFit="cover"
                    width={2024}
                    height={1138}
                />
            </div>
            {/* <div className={isShowBtn ? styles.show : styles.hidden}>
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
            </div> */}

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