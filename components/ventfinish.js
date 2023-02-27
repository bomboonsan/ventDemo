import { useState, useEffect } from 'react';
import styles from './ventfinish.module.scss'
import Image from 'next/image'
import Link from "next/link";
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'
import Moveable from "react-moveable"; // preact-moveable
// import dynamic from 'next/dynamic'


export default function VentFinish() {
    const [playing, setPlaying] = useState(true);
    const [loop, setLoop] = useState(true);
    const [showPanel, setShowPanel] = useState(false);
    const [urlVideo, setUrlVideo] = useState('https://wish-integrate.com/vent-video/1wave.mp4');

    const [footerText, setFooterText] = useState('ปรับหน้าจอให้เป็น 3 Waveform');
    const [footerTextStep, setFooterTextStep] = useState(0);

    const [isFinish, setIsFinish] = useState(false);

    function endVideo() {

    }

    const SwitchWaveFormPanel = () => {
        return (
            <div className={styles.switchWaveFormPanel}>        
              <Image                
                    src="/images/switchWaveForm.png"
                    alt="switchWaveForm"
                    // layout="fill"
                    // objectFit="cover"
                    width={2024}
                    height={1138}
                />
                <div className={styles.switchWave_1} onClick={() => {setUrlVideo('https://wish-integrate.com/vent-video/1wave.mp4')}}></div>
                <div className={styles.switchWave_2} onClick={() => {setUrlVideo('https://wish-integrate.com/vent-video/2wave.mp4')}}></div>
                <div className={styles.switchWave_3} onClick={() => {setUrlVideo('https://wish-integrate.com/vent-video/3wave.mp4') ; setIsFinish(true)}}></div>
                <div className={styles.switchWave_4} onClick={() => {setUrlVideo('https://wish-integrate.com/vent-video/4wave.mp4')}}></div>
                <div className={styles.switchWave_5} onClick={() => {setUrlVideo('https://wish-integrate.com/vent-video/5wave.mp4')}}></div>
                <div className={styles.closeWaveFormPanel} onClick={() => {setShowPanel(false)}}></div>
            </div>
        )
    }


    let listFooterText = [
        // 'ตั้งค่า ventilator ใส่ข้อมูลคนไข้เพศชาย สูง 170 ซม.',
        // 'ตั้งค่า ventilator mode ตามความเหมาะสมของคนไข้',
        // // 'ตั้งค่า Flow trigger 3L/min',
        // // 'ตั้งค่า Peep 3 cmH2O',
        // // 'ตั้งค่าให้ pressure support 10 cmH2O',
        // // 'คนไข้มีภาวะของ Airway resistance ปรับ rise time เป็น 25%',
        // // 'ตั้งค่า %O2 : 40',
        // // 'พบว่าคนไข้มีdelay cycling ปรับ Esens 50%',
        // 'ตั้งค่า Pressure Support เป็น 10 cmH2O',
        // 'ตั้งค่า Flow trigger เป็น 3L/min',
        // 'ตั้งค่า % O2 เป็น 40%',
        // 'ตั้งค่า Pmax 35 cmH2O',
        // 'ปรับ Esense เป็น 25%',
        // 'PEEP 5 cmH2O',
        // 'ปรับ P Rise เป็น 50%',
        // 'กด Accept All เพื่อยืนยันการตั้งค่า โปรดตรวจสอบให้แน่ใจว่าคำตอบของท่านถูกต้อง'
        'ปรับหน้าจอให้เป็น 3 Waveform'        
    ]

    const nextText = () => {
        if (footerTextStep+1 < listFooterText.length) {
            setFooterTextStep(footerTextStep+1);
            setFooterText(listFooterText[footerTextStep+1])
            // show Previos
            const btnPrevios = document.querySelector("#btnPrevios")
            btnPrevios.classList.remove(styles['hidden']);
            if (footerTextStep+2 == listFooterText.length) {
                // #hidden NEXT
                const btnNext = document.querySelector("#btnNext")
                btnNext.classList.add(styles['hidden']);
            }
        }
    }
    const previosText = () => {
        if (footerTextStep-1 >= 0) {
            setFooterTextStep(footerTextStep-1);
            setFooterText(listFooterText[footerTextStep-1])
            const btnNext = document.querySelector("#btnNext")
            btnNext.classList.remove(styles['hidden']);

            if (footerTextStep-1 == 0) {
                // hidden Previos
                const btnPrevios = document.querySelector("#btnPrevios")
                btnPrevios.classList.add(styles['hidden']);
            }
        }
    }

    return (           
        <section id='ventContainer' className={styles.vent_container}>
            <div className={styles.video_wrapper} >
                <ReactPlayer 
                className={styles.video_item} 
                url={urlVideo}  
                playing={playing} 
                onEnded={endVideo}
                width='100%'
                height='100%'
                loop={loop}
                // controls
                />
                
                {showPanel && <SwitchWaveFormPanel />}
                <div className={styles.switchBtnItem}  onClick={() => {setShowPanel(true)}}>
                </div>
            </div> 
            <div className={styles.footer}>
                {!isFinish &&
                <div id='introductionBox' className={styles.introduction_box}>
                    <p>
                        {footerText}
                    </p>
                </div>
                }
                {isFinish &&
                <div id='finishBtn' className={styles.finishBtnContainer}>
                    <Link href='/menulearningmode'>
                    <button className={styles.btnItem}>
                        FINISH
                    </button>
                    </Link>
                </div>
                }
            </div>            
            <footer className={styles.controlpanel_wrap}>
                <div className={styles.controlpanel_row}>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/displaybrightnesskey.png"
                            alt="displaybrightnesskey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/displaylockkey.png"
                            alt="displaylockkey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/displayvolumekey.png"
                            alt="displayvolumekey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/manualinspirationkey.png"
                            alt="manualinspirationkey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel_knob_box}>
                        <Image
                            src="/vent/covidienknob.png"
                            alt="covidienknob"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/inspiratorypausekey.png"
                            alt="inspiratorypausekey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/expiratorypausekey.png"
                            alt="expiratorypausekey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/alarmresetkey.png"
                            alt="alarmresetkey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div className={styles.controlpanel}>
                        <Image
                            src="/vent/alarmsilencekey.png"
                            alt="alarmsilencekey"
                            // layout="fill"
                            // objectFit="cover"
                            width={196}
                            height={196}
                        />
                    </div>
                </div>
            </footer>
        </section>
    )
}