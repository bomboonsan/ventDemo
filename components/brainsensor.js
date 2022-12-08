import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from './brainsensor.module.scss'
import Moveable from "react-moveable"; // preact-moveable
// https://daybrush.com/moveable/storybook/?path=/story/basic--origindraggable
import { useRouter } from 'next/router'
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function BrainSensor() {
    const router = useRouter()
    const [bg, setBg] = useState('/images/imageBrain3.png');


    const [status1, setStatus1] = useState('/images/BrainMonitoring-item-blank.png');
    const [status2, setStatus2] = useState('/images/BrainMonitoring-item-blank.png');
    const [status3, setStatus3] = useState('/images/BrainMonitoring-item-blank.png');
    const [status4, setStatus4] = useState('/images/BrainMonitoring-item-blank.png');


    const [varImage, setVarImage] = useState('/images/BrainMonitoring-item1.png');
    const showFinish = () => {
        setVarImage('/images/BrainMonitoring-item2.png')
    }

    const popUpStart = () => {
        document.querySelector('#popupContent').classList.add(styles['hidden']);
    }

    const replace = () => {
        setStatus1('/images/BrainMonitoring-item-blank.png')
        setStatus2('/images/BrainMonitoring-item-blank.png')
        setStatus3('/images/BrainMonitoring-item-blank.png')
        setStatus4('/images/BrainMonitoring-item-blank.png')
    }

    const number1Fail = () => {
        setStatus1('/images/BrainMonitoring-item-1red.png')
    }
    const number2Fail = () => {
        setStatus2('/images/BrainMonitoring-item-2red.png')
    }
    const number3Fail = () => {
        setStatus3('/images/BrainMonitoring-item-3red.png')
    }
    const number4Fail = () => {
        setStatus4('/images/BrainMonitoring-item-4red.png')
    }

    const number1Touch = () => {
        if (status1 == '/images/BrainMonitoring-item-1red.png') {
            
        } else {
            setStatus1('/images/BrainMonitoring-item-1green.png')
        }
    }
    const number2Touch = () => {
        if (status2 == '/images/BrainMonitoring-item-2red.png') {
            
        } else {
            setStatus2('/images/BrainMonitoring-item-2green.png')
        }
    }
    const number3Touch = () => {
        if (status3 == '/images/BrainMonitoring-item-3red.png') {
            
        } else {
            setStatus3('/images/BrainMonitoring-item-3green.png')
        }
    }
    const number4Touch = () => {
        if (status4 == '/images/BrainMonitoring-item-4red.png') {
            
        } else {
            setStatus4('/images/BrainMonitoring-item-4green.png')
        }
    }

    const confirm = () => {
        if (status1 == '/images/BrainMonitoring-item-1green.png' && status2 == '/images/BrainMonitoring-item-2green.png' && status3 == '/images/BrainMonitoring-item-3green.png' && status4 == '/images/BrainMonitoring-item-4green.png' ) {
            router.push('/brain/result/sensor')
        }
    }


    function handleSwitch() {
        if (bg == '/images/imageBrain3.png') {
            setBg('/images/SideView.png');
            document.querySelector('#monitorArea').classList.add(styles['hidden']);
            document.querySelector('#touchArea_1_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_1_2').classList.add(styles['hidden']);
            document.querySelector('#touchArea_2_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_2_2').classList.add(styles['hidden']);
            document.querySelector('#touchArea_2_3').classList.add(styles['hidden']);
            document.querySelector('#touchArea_2_4').classList.add(styles['hidden']);
            document.querySelector('#touchArea_3_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_3_2').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_1').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_2').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_3').classList.add(styles['hidden']);
            document.querySelector('#touchArea_4_4').classList.add(styles['hidden']);

            document.querySelector('#noTouchArea_1').classList.add(styles['hidden']);
            document.querySelector('#noTouchArea_2').classList.add(styles['hidden']);
            document.querySelector('#noTouchArea_3').classList.add(styles['hidden']);
            document.querySelector('#noTouchArea_4').classList.add(styles['hidden']);

            document.querySelector('#touchArea_3_1_side').classList.add(styles['show']);
            document.querySelector('#touchArea_3_2_side').classList.add(styles['show']);
            document.querySelector('#touchArea_3_3_side').classList.add(styles['show']);
            document.querySelector('#touchArea_3_4_side').classList.add(styles['show']);

            document.querySelector('#noTouchArea_3_side').classList.add(styles['show']);
            
            // document.querySelector('#dropArea').classList.add(styles['invisible']);
            // document.querySelector('.moveable-control').classList.add(styles['invisible']);

            document.querySelector('#switchIcon').classList.add(styles['rotated']);
        } else {
            setBg('/images/imageBrain3.png');
            document.querySelector('#monitorArea').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_1_1').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_1_2').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_2_1').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_2_2').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_2_3').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_2_4').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_3_1').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_3_2').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_4_1').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_4_2').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_4_3').classList.remove(styles['hidden']);
            document.querySelector('#touchArea_4_4').classList.remove(styles['hidden']);

            document.querySelector('#noTouchArea_1').classList.remove(styles['hidden']);
            document.querySelector('#noTouchArea_2').classList.remove(styles['hidden']);
            document.querySelector('#noTouchArea_3').classList.remove(styles['hidden']);
            document.querySelector('#noTouchArea_4').classList.remove(styles['hidden']);

            document.querySelector('#touchArea_3_1_side').classList.remove(styles['show']);
            document.querySelector('#touchArea_3_2_side').classList.remove(styles['show']);
            document.querySelector('#touchArea_3_3_side').classList.remove(styles['show']);
            document.querySelector('#touchArea_3_4_side').classList.remove(styles['show']);

            document.querySelector('#noTouchArea_3_side').classList.remove(styles['show']);
            // document.querySelector('#traget').classList.remove(styles['invisible']);
            // document.querySelector('#dropArea').classList.remove(styles['invisible']);
            // document.querySelector('.moveable-control').classList.remove(styles['invisible']);

            document.querySelector('#switchIcon').classList.remove(styles['rotated']);
        }
    }

    return (
        <div className={styles.traget_container}>
            <div className={styles.bg_area}>
                <Image
                    className={styles.womanbg}
                    src={bg}
                    alt="Women"
                    // layout="fill"
                    // objectFit="cover"
                    draggable='false'
                    width={3840}
                    height={2160}
                />
            </div>
            <div id='monitorArea' className={styles.monitorArea}>
                <Image
                    src='/images/BrainMonitoring-item1.png'
                    alt="BIS"
                    // layout="fill"
                    // objectFit="cover"
                    width={1905}
                    height={605}
                />
                <div className={styles.statusImage_area}>
                    <div className={styles.statusImage}>
                        <Image
                            src={status1}
                            alt="BIS"
                            width={1905}
                            height={605}
                        />
                    </div>
                    <div className={styles.statusImage}>
                        <Image
                            src={status2}
                            alt="BIS"
                            width={1905}
                            height={605}
                        />
                    </div>
                    <div className={styles.statusImage}>
                        <Image
                            src={status3}
                            alt="BIS"
                            width={1905}
                            height={605}
                        />
                    </div>
                    <div className={styles.statusImage}>
                        <Image
                            src={status4}
                            alt="BIS"
                            width={1905}
                            height={605}
                        />
                    </div>
                </div>
            </div>
            <div id='touchArea_1_1' className={styles.touchArea_1_1} onClick={number1Touch}></div>
            <div id='touchArea_1_2' className={styles.touchArea_1_2} onClick={number1Touch}></div>
            <div id='touchArea_2_1' className={styles.touchArea_2_1} onClick={number2Touch}></div>
            <div id='touchArea_2_2' className={styles.touchArea_2_2} onClick={number2Touch}></div>
            <div id='touchArea_2_3' className={styles.touchArea_2_3} onClick={number2Touch}></div>
            <div id='touchArea_2_4' className={styles.touchArea_2_4} onClick={number2Touch}></div>
            <div id='touchArea_3_1' className={styles.touchArea_3_1} onClick={number3Touch}></div>
            <div id='touchArea_3_2' className={styles.touchArea_3_2} onClick={number3Touch}></div>
            <div id='touchArea_4_1' className={styles.touchArea_4_1} onClick={number4Touch}></div>
            <div id='touchArea_4_2' className={styles.touchArea_4_2} onClick={number4Touch}></div>
            <div id='touchArea_4_3' className={styles.touchArea_4_3} onClick={number4Touch}></div>
            <div id='touchArea_4_4' className={styles.touchArea_4_4} onClick={number4Touch}></div>

            <div id='touchArea_3_1_side' className={styles.touchArea_3_1_side} onClick={number3Touch}></div>
            <div id='touchArea_3_2_side' className={styles.touchArea_3_2_side} onClick={number3Touch}></div>
            <div id='touchArea_3_3_side' className={styles.touchArea_3_3_side} onClick={number3Touch}></div>
            <div id='touchArea_3_4_side' className={styles.touchArea_3_4_side} onClick={number3Touch}></div>


            <div id='noTouchArea_1' className={styles.noTouchArea_1} onClick={number1Fail}></div>
            <div id='noTouchArea_2' className={styles.noTouchArea_2} onClick={number2Fail}></div>
            <div id='noTouchArea_3' className={styles.noTouchArea_3} onClick={number3Fail}></div>            
            <div id='noTouchArea_4' className={styles.noTouchArea_4} onClick={number4Fail}></div>

            <div id='noTouchArea_3_side' className={styles.noTouchArea_3_side} onClick={number3Fail}></div>
            
           
            <div id='switchIcon' className={styles.changeView}>
                <Image
                    src="/images/switch.png"
                    alt="BIS"
                    // layout="fill"
                    // objectFit="cover"
                    width={1905}
                    height={605}
                    onClick={handleSwitch}
                />   
            </div>

            <div id='popupContent' className={styles.popupArea}>
                <div className={styles.popup_wrap}>
                    <h2>
                        หัวข้อ
                    </h2>
                    <p>
                        มาติดตั้งอุปกรณ์กันเถอะ เริ่มต้นจากถูไปที่อุปกรณ์
                    </p>
                    <div className={styles.popUpbtnStart}>
                        <button onClick={popUpStart}>
                            เริ่ม
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.btn_group}>
                <button onClick={replace}>
                Replace
                </button>
                <button onClick={confirm}>
                Confirm
                </button>
            </div>
        </div>
    )
}

