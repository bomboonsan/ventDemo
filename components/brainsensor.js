import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from './brainsensor.module.scss'
import Moveable from "react-moveable"; // preact-moveable
// https://daybrush.com/moveable/storybook/?path=/story/basic--origindraggable
import { useRouter } from 'next/router'
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function BrainSensor() {
    const router = useRouter()
    const [status1, setStatus1] = useState('/images/BrainMonitoring-item-blank.png');
    const [status2, setStatus2] = useState('/images/BrainMonitoring-item-blank.png');
    const [status3, setStatus3] = useState('/images/BrainMonitoring-item-blank.png');
    const [status4, setStatus4] = useState('/images/BrainMonitoring-item-blank.png');


    const [varImage, setVarImage] = useState('/images/BrainMonitoring-item1.png');
    const showFinish = () => {
        setVarImage('/images/BrainMonitoring-item2.png')
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

    return (
        <div className={styles.traget_container}>
            <div className={styles.bg_area}>
                <Image
                    className={styles.womanbg}
                    src="/images/imageBrain3.png"
                    alt="Women"
                    // layout="fill"
                    // objectFit="cover"
                    draggable='false'
                    width={3840}
                    height={2160}
                />
            </div>
            <div className={styles.monitorArea}>
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
            <div className={styles.touchArea_1_1} onClick={number1Touch}></div>
            <div className={styles.touchArea_2_1} onClick={number2Touch}></div>
            <div className={styles.touchArea_2_2} onClick={number2Touch}></div>
            <div className={styles.touchArea_3_1} onClick={number3Touch}></div>
            <div className={styles.touchArea_3_2} onClick={number3Touch}></div>
            <div className={styles.touchArea_4_1} onClick={number4Touch}></div>
            <div className={styles.touchArea_4_2} onClick={number4Touch}></div>
            <div className={styles.touchArea_4_3} onClick={number4Touch}></div>


            <div className={styles.noTouchArea_1} onClick={number1Fail}></div>
            <div className={styles.noTouchArea_2} onClick={number2Fail}></div>
            <div className={styles.noTouchArea_3} onClick={number3Fail}></div>
            <div className={styles.noTouchArea_4} onClick={number4Fail}></div>
           

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

