import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from './brainsensor.module.scss'
import Moveable from "react-moveable"; // preact-moveable
// https://daybrush.com/moveable/storybook/?path=/story/basic--origindraggable
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function BrainSensor() {
    
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
                    src="/images/BrainMonitoring-item.png"
                    alt="BIS"
                    // layout="fill"
                    // objectFit="cover"
                    width={1905}
                    height={605}
                />   
            </div>
           
        </div>
    )
}

