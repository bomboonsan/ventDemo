import styles from './trouble-shooting.module.scss'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'

export default function HomeAlert() {
    const router = useRouter()
    const [isStart, setisStart] = useState(false);

    const [showElement, setShowElement] = useState('');

    const [missions, setMissions] = useState([]);

    function handleStart() {
        setisStart(true);
    }
    function closeBox() {
        setShowElement('')

        // ตรวจสอบ Mission ว่าครบหรือยัง ()
        if (missions.includes("Patient") && missions.includes("Ventilator") && missions.includes("Circuits") && missions.includes("Tube") && missions.includes("CloseSuction")) {
            // console.log('Next')
            router.push('/quiz/trouble-shooting-case1-1')
        }
    }
    function handleMission(mission) {
        missions.push(mission);

        // ลบ Ojb ซ้ำกันใน Arr
        let uniqueMissions = [...new Set(missions)];
        
        setMissions(uniqueMissions)
        console.log(uniqueMissions)

    }


    // +++++++++++++++++++++++++++++++++++++
    // Component
    // +++++++++++++++++++++++++++++++++++++
    
    // กล่องข้อความเริ่มต้น
    const StartBox = () => {
        return (
            <div className={styles.startBox}>
                <p>
                จากสถานการณ์ที่เกิดขึ้น ท่านจะตรวจสอบ และจัดการแก้ไขปัญหานี้อย่างไร   <br/>
                ท่านต้องเลือกสิ่งที่ท่านต้องการตรวจตรวจสอบ เพื่อหาสาเหตุของปัญหานี้
                </p>
                <button className={styles.startBtn} onClick={handleStart}>
                    NEXT
                </button>
            </div>
          );
    }
    
    // ตำแหน่งของคนไข้
    const PatientElement = () => {
        return (
            <div className={styles.patientElement} onClick={() => {setPatientAlertStep(1) ; setShowElement('Patient')}}>                
            </div>
        )
    }
    // กล่องข้อความของคนไข้
    const [patientAlertStep, setPatientAlertStep] = useState(1);
    const PatientAlertBox1 = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <div className={styles.alertHead}>
                    <p>
                        ตรวจร่างกายผู้ป่วย
                    </p>                    
                </div>
                <div>
                    <Image
                        onClick={() => setPatientAlertStep(2)}
                        className={styles.alertImage}
                        src='/troubleshooting/04.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={200}
                        height={200}
                    />
                    </div>
            </div>
        )
    }
    const PatientAlertBox2 = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <div className={styles.alertHead}>
                    <p>
                        ฟังเสียงปอด
                    </p>                    
                </div>
                <div>
                    <Image
                        onClick={() =>  {setPatientAlertStep(3) ; setPlayingYoutube(true) ; handleMission('Patient')}}
                        className={styles.alertImage}
                        src='/troubleshooting/01.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={200}
                        height={200}
                    />
                    </div>
            </div>
        )
    }
    const [playingYoutube, setPlayingYoutube] = useState(false);
    const [urlYoutube, setUrlYoutube] = useState('https://www.youtube.com/watch?v=aSor2XBc9K8?start=46');
    const resetYoutube = () => {
        setPatientAlertStep(1)
        setShowElement('')
    }
    const PatientAlertBox3 = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <ReactPlayer 
                className={styles.alertYoutube}
                url={urlYoutube}
                playing={playingYoutube} 
                onEnded={resetYoutube}
                
                width='100%'
                height='100%'
                />
            </div>
        )
    }


    // ตำแหน่งของ Ventilator (เครื่องช่วยหายใจ)
    const VentilatorElement = () => {
        return (
            <div className={styles.ventilatorElement} onClick={() => {setPlayingVent(true) ; setShowElement('Ventilator') ; handleMission('Ventilator')}}>                
            </div>
        )
    }
    const [playingVent, setPlayingVent] = useState(false);
    const [urlVent, setUrlVent] = useState('https://wish-integrate.com/vent-video/trouble-ventilator.mp4');
    const resetVent = () => {
        setShowElement('')
    }
    const VentilatorMonitor = () => {
        return (
            <div className={styles.ventilatorMonitor}>          
                <div className={styles.alertClose} onClick={closeBox}>
                X
                </div>
                <div className={styles.ventilatorMonitorVideo}>
                <ReactPlayer 
                    className={styles.alertYoutube}
                    url={urlVent}
                    playing={playingVent} 
                    onEnded={resetVent}
                    
                    width='100%'
                    height='100%'
                />
                </div>
            </div>
        )
    }


    // ตำแหน่งของ Circuits (เครื่องช่วยหายใจ)
    const CircuitsElement = () => {
        return (
            <div className={styles.circuitsElement} onClick={() => {setShowElement('Circuits') ; handleMission('Circuits')}}>                
            </div>
        )
    }
    const CircuitsAlertBox = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <div className={styles.alertText}>
                <p>
                    ไม่มีน้ำใน ventilator circuits <br/>
                    (ไม่มี Condensate)
                </p>
                </div>
            </div>
        )
    }
    

    // ตำแหน่งของ Tube
    const TubeElement = () => {
        return (
            <div className={styles.tubeElement} onClick={() => {setShowElement('Tube') ; handleMission('Tube')}}>                
            </div>
        )
    }
    const TubeAlertBox = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <div className={styles.alertText}>
                <p>
                ตรวจพบเสมหะจำนวนมาก
                </p>
                </div>
            </div>
        )
    }

    // ตำแหน่งของ Tube (เครื่องช่วยหายใจ)
    const CloseSuctionElement = () => {
        return (
            <div className={styles.closeSuctionElement} onClick={() => {setShowElement('CloseSuction') ; handleMission('CloseSuction')}}>                
            </div>
        )
    }
    const CloseSuctionAlertBox = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <div className={styles.alertText}>
                <p>
                ตรวจพบเสมหะจำนวนมาก
                </p>
                </div>
            </div>
        )
    }


    // Render
    return (
        <div className={styles.room_bg}>
            {!isStart && <StartBox />}

            <PatientElement />
            {showElement=='Patient' && patientAlertStep==1 && <PatientAlertBox1 />}
            {showElement=='Patient' && patientAlertStep==2 && <PatientAlertBox2 />}
            {showElement=='Patient' && patientAlertStep==3 && <PatientAlertBox3 />}

            <VentilatorElement />
            {showElement=='Ventilator' && <VentilatorMonitor />}

            <CircuitsElement />
            {showElement=='Circuits' && <CircuitsAlertBox />}

            <TubeElement />
            {showElement=='Tube' && <TubeAlertBox />}

            <CloseSuctionElement />
            {showElement=='CloseSuction' && <CloseSuctionAlertBox />}
        </div>        
    )
}