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

    const [startTime, setStartTime] = useState(null);
    useEffect(() => {
        const { start } = router.query;
        if (start === null || start === undefined) {
        // Handle when 'timer' is null or undefined
        console.log('timer is null or undefined');      
        router.push('/trouble-shooting/case2-step1')
        } else {
        // Handle when 'timer' has a value
        }
        setStartTime(start)
    }, []);

    // const [seconds, setSeconds] = useState(0);
    // const [minutes, setMinutes] = useState(0);
    // useEffect(() => {
    //     const { timer } = router.query;
    //     if (timer === null || timer === undefined) {
    //     // Handle when 'timer' is null or undefined
    //     console.log('timer is null or undefined');      
    //     router.push('/trouble-shooting/case2-step1')
    //     } else {
    //     // Handle when 'timer' has a value
    //     console.log('timer:', timer);
    //     }
    //     setSeconds(Number(timer))
        
    //     const interval = setInterval(() => {
    //       setSeconds((prevSeconds) => prevSeconds + 1);
    //     }, 1000);
    
    //     return () => clearInterval(interval);
    // }, []);
    
    // useEffect(() => {
    //     if (seconds === 60) {
    //         setSeconds(0);
    //         setMinutes((prevMinutes) => prevMinutes + 1);
    //     }
    // }, [seconds]);

    useEffect(() => {
        if (missions.includes("Patient_1") && missions.includes("Patient_2") && missions.includes("Patient_3") && !missions.includes("Patient")) {
            handleMission('Patient')
            closeBox()
        }
    }, [missions]);

    function handleStart() {
        setisStart(true);
    }
    function handleFinish() {
        // router.push('/trouble-shooting/success2')
        router.push('/trouble-shooting/success2/?start='+startTime)
    }
    function closeBox() {
        setShowElement('')

        // Step นี้ไม่ต้องตรวจสอบ Mission ว่าครบหรือยัง ()
        // if (missions.includes("Patient_1") && missions.includes("Patient_2") && missions.includes("Patient_3") && missions.includes("Circuits") && missions.includes("Tube") ) {
        //     // console.log('Next')
        //     router.push('/quiz/trouble-shooting-case2-1')
        // }

        // if (missions.includes("Patient_1") && missions.includes("Patient_2") && missions.includes("Patient_3") && missions.includes("Ventilator") ) {
        //     // console.log('Next')
        //     router.push('/quiz/trouble-shooting-case1-1')
        // }

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
                ท่านพบสาเหตุของปัญหานี้แล้ว
ท่านต้องเลือกอุปกรณ์ที่ท่านจะทำการแก้ไขปัญหานี้

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
            <div className={styles.patientElement}>
                {/* {missions.includes("Patient") && */}
                {showElement=='Patient' && patientAlertStep==5 && isFinishPatient ? (
                <div className={styles.checkedIconElement} onClick={() => {setPatientAlertStep(1) ; setShowElement('Patient')}}>
                </div>  
                ) 
                : 
                <div className={styles.alertIconElement} onClick={() => {setPatientAlertStep(1) ; setShowElement('Patient')}}>
                </div>
                }
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
                <div className={styles.d_flex}>
                    <div>
                        <Image
                            onClick={() => {setPlayingYoutube(true) ; setPatientAlertStep(4)}}
                            className={styles.alertImage}
                            src='/images/case3-thumb3.png'
                            alt="Hover"
                            // layout="fill"
                            // objectFit="cover"
                            draggable='false'
                            width={200}
                            height={200}
                        />
                    </div>
                    <div>
                        <Image
                            onClick={() => {setPlayingYoutube(true) ; setPatientAlertStep(2)}}
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
                    <div>
                        <Image
                            onClick={() => {setPlayingYoutube(true) ; setPatientAlertStep(5)}}
                            className={styles.alertImage}
                            src='/troubleshooting/09.png'
                            alt="Hover"
                            // layout="fill"
                            // objectFit="cover"
                            draggable='false'
                            width={200}
                            height={200}
                        />
                    </div>
                </div>                
                {/* <button className={styles.alertSubmitBtn} onClick={() => {setPlayingYoutube(true) ; setPatientAlertStep(2)}}>
                    NEXT
                </button> */}
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
                        // onClick={() =>  {setPatientAlertStep(3) ; setPlayingYoutube(true) ; handleMission('Patient')}}
                        onClick={() =>  {setPlayingYoutube(true) ; handleMission('Patient_1')}}
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
                <PatientAlertBox3 />
                {/* <button className={styles.alertSubmitBtn} onClick={() =>  {setPatientAlertStep(3) ; setPlayingYoutube(true) ; handleMission('Patient')}}>
                    NEXT
                </button> */}
                <button className={styles.alertSubmitBtn} onClick={() =>  {closeBox() ; handleMission('Patient_1') ; setPlayingYoutube(false)}}>
                    GOT IT
                </button>
            </div>
        )
    }  





    const [playingYoutube, setPlayingYoutube] = useState(false);
    // const [urlYoutube, setUrlYoutube] = useState('https://www.youtube.com/watch?v=aSor2XBc9K8?start=46');
    const [urlYoutube, setUrlYoutube] = useState('https://wish-integrate.com/vent-video/trouble-shooting2-edit.mp3');
    const resetYoutube = () => {
        setPatientAlertStep(1)
        setShowElement('')
    }
    const PatientAlertBox3 = () => {
        return (
            // <div className={styles.alertBox}>
            //     <div className={styles.alertClose} onClick={closeBox}>
            //         X
            //     </div>
            //     <ReactPlayer 
            //     className={styles.alertYoutube}
            //     url={urlYoutube}
            //     playing={playingYoutube} 
            //     onEnded={resetYoutube}
            //     controls={true}
            //     width="400px"
            //     height="50px"
            //     />
            //     <button className={styles.alertSubmitBtn} onClick={closeBox}>
            //         GOT IT
            //     </button>
            // </div>

            <ReactPlayer 
            className={styles.alertYoutube}
            url={urlYoutube}
            playing={playingYoutube} 
            onEnded={resetYoutube}
            controls={true}
            width="100%"
            height="40px"
            />
        )
    }


    const PatientAlertBox4 = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <div className={styles.alertText}>
                    <div className={styles.d_flex}>
                        <div>
                            <button className={styles.alertSubmitBtn2} onClick={() =>  {closeBox ; setPatientAlertStep(6)}}>
                            Inflate ลมกลับเข้าไปใน Cuff
                            </button>
                        </div>
                        <div>
                            <button className={styles.alertSubmitBtn2} onClick={() =>  {closeBox ; setPatientAlertStep(7)}}>
                                ปรับตำแหน่งของ Tube
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const PatientAlertBox5 = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <div className={styles.alertText}>
                    <p>
                    ความดันที่วัดได้อยู่ที่ 5 cm/H<sub>2</sub>O
                    </p>        
                    <button className={styles.finishBtn} onClick={() =>  {closeBox ; setPatientAlertStep(0)}}>
                        GOT IT
                    </button>            
                </div>
            </div>
        )
    }

    const PatientAlertBox5_finish = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <div className={styles.alertText}>
                    <p>
                    ความดันที่วัดได้อยู่ที่ 25 cm/H<sub>2</sub>O
                    </p>        
                    <button className={styles.finishBtn} onClick={handleFinish}>
                        FINISH
                    </button>            
                </div>
            </div>
        )
    }

    const [isFinishPatient, setIsFinishPatient] = useState(false);
    const PatientAlertBox6 = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <div className={styles.alertText}>
                    <p>
                    กลับไปกด ตรวจสอบอุปกรณ์โดย Cuff Pressure Gauge
                    </p>                    
                </div>
                <button className={styles.alertSubmitBtn} onClick={() =>  {closeBox() ; handleMission('Patient_4') ; setIsFinishPatient(true) ; setPlayingYoutube(false)}}>
                    GOT IT
                </button>
            </div>
        )
    }

    const PatientAlertBox7 = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <div className={styles.alertText}>
                    <p>
                    Tube อยู่ในตำแหน่งที่เหมาะสมแล้ว
                    </p>                    
                </div>
                <button className={styles.alertSubmitBtn} onClick={() =>  {closeBox() ; handleMission('Patient_5') ; setPlayingYoutube(false)}}>
                    GOT IT
                </button>
            </div>
        )
    }


    // ตำแหน่งของ Ventilator (เครื่องช่วยหายใจ)
    const VentilatorElement = () => {
        return (
            <div className={styles.ventilatorElement}>          
                {missions.includes("Ventilator") &&
                <div className={styles.checkedIconElement} onClick={() => {setPlayingVent(true) ; setShowElement('Ventilator') ; handleMission('Ventilator')}}>
                </div>                
                }
                {!missions.includes("Ventilator") &&
                <div className={styles.alertIconElement} onClick={() => {setPlayingVent(true) ; setShowElement('Ventilator') ; handleMission('Ventilator')}}>
                </div>                
                } 
            </div>
        )
    }
    const [playingVent, setPlayingVent] = useState(false);
    // const [urlVent, setUrlVent] = useState('https://wish-integrate.com/vent-video/trouble-ventilator-case2.mp4');
    const [urlVent, setUrlVent] = useState('https://wish-integrate.com/vent-video/trouble-shooting2-edit.mp4');
    const resetVent = () => {
        setShowElement('')
    }
    const VentilatorMonitor = () => {
        return (
            <div className={styles.ventilatorMonitor2}>          
                <div className={styles.alertCloseXL} onClick={closeBox}>
                X
                </div>
                <div className={styles.ventilatorMonitorVideo2}>
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
            <div className={styles.circuitsElement}> 
                {/* <div className={styles.alertIconElement} onClick={() => {setPlayingVent(true) ; setShowElement('Ventilator') ; handleMission('Ventilator')}}>
                </div>                  */}
                {/* {missions.includes("Circuits") &&
                <div className={styles.checkedIconElement} onClick={() => {setShowElement('Circuits') ; handleMission('Circuits')}}>
                </div>                
                }
                {!missions.includes("Circuits") &&
                <div className={styles.alertIconElement} onClick={() => {setShowElement('Circuits') ; handleMission('Circuits')}}>
                </div>                
                }   */}
                <div className={styles.alertIconElement} onClick={() => {setShowElement('Circuits') ; handleMission('Circuits')}}>
                </div>   

            </div>
        )
    }
    const [circuitsAlertBoxStep, setCircuitsAlertBoxStep] = useState(0);
    const CircuitsAlertBox = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                {/* <div className={styles.alertText}>
                <p>
                ขยับข้อต่อแล้วแน่นดี
                </p>
                </div> */}
                <div className={styles.alertText}>
                    <div className={styles.d_flex}>
                            <div>
                                <button className={styles.alertSubmitBtn2} onClick={() => {handleMission('Circuits') ; setCircuitsAlertBoxStep(2)}}>
                                ตรวจสอบการรั่ว Ventilator Circuits
                                </button>
                            </div>
                            <div>
                                <button className={styles.alertSubmitBtn2} onClick={() => {handleMission('Circuits') ; setCircuitsAlertBoxStep(2)}}>
                                เปลี่ยน Ventilator Circuits
                                </button>
                            </div>
                    </div>
                </div>
                {/* <button className={styles.alertSubmitBtn} onClick={closeBox}>
                    NEXT
                </button> */}
            </div>
        )
    }
    const CircuitsAlertBox2 = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={() => {closeBox() ; setCircuitsAlertBoxStep(0)}}>
                    X
                </div>
                <div className={styles.alertText}>
                <p>
                ไม่มีการรั่วของ Ventilator Circuits
                </p>
                </div>
                <button className={styles.alertSubmitBtn} onClick={() => {closeBox() ; setCircuitsAlertBoxStep(0)}}>
                    NEXT
                </button>
            </div>
        )
    }
    
    

    // ตำแหน่งของ Cuff
    const CuffElement = () => {
        return (
            <div className={styles.cuffElement}>      
                {missions.includes("Cuff") &&
                <div className={styles.checkedIconElementRight} onClick={() => {setShowElement('Cuff')}}>
                </div>                
                }
                {!missions.includes("Cuff") &&
                <div className={styles.alertIconElementRight} onClick={() => {setShowElement('Cuff')}}>
                </div>                
                }  
            </div>
        )
    }
    const CuffAlertBox = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>                
                <div className={styles.alertHead}>
                    <p>
                    ตรวจสอบอุปกรณ์
                    </p>                    
                </div>
                <div>
                    <Image
                        onClick={() =>  {setShowElement('Cuff2') ; handleMission('Cuff')}}
                        className={styles.alertImage}
                        src='/troubleshooting/09.png'
                        alt="Hover"
                        // layout="fill"
                        // objectFit="cover"
                        draggable='false'
                        width={200}
                        height={200}
                    />
                </div>
                <button className={styles.alertSubmitBtn} onClick={() =>  {setShowElement('Cuff2') ; handleMission('Cuff')}}>
                    NEXT
                </button>
            </div>
        )
    }
    const CuffAlertBox2 = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>                
                <div className={styles.alertText}>
                <p>
                ความดันที่วัดได้อยู่ที่ 5 cm/H2O
                </p>
                </div>
                <button className={styles.alertSubmitBtn} onClick={closeBox}>
                    NEXT
                </button>
            </div>
        )
    }


    // ตำแหน่งของ Tube
    const TubeElement = () => {
        return (
            <div className={styles.tubeElement}>     
                {missions.includes("Tube") &&
                <div className={styles.checkedIconElementLeft} onClick={() => {setShowElement('Tube') ; handleMission('Tube')}}>
                </div>                
                }
                {!missions.includes("Tube") &&
                <div className={styles.alertIconElementLeft} onClick={() => {setShowElement('Tube') ; handleMission('Tube')}}>
                </div>                
                }  
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
                อุปกรณ์อยู่มุมปากตำแหน่งเดิม
                </p>
                </div>
                <button className={styles.alertSubmitBtn} onClick={closeBox}>
                    NEXT
                </button>
            </div>
        )
    }

    // ตำแหน่งของ Tube (เครื่องช่วยหายใจ)
    const [closeSuctionAlertStep, setCloseSuctionAlertStep] = useState(0);
    const CloseSuctionElement = () => {
        return (
            <div className={styles.closeSuctionElement}>         
                {/* {missions.includes("CloseSuction") &&
                <div className={styles.checkedIconElement} onClick={() => {setShowElement('CloseSuction') ; handleMission('CloseSuction') ; setCloseSuctionAlertStep(0)}}>
                </div>                
                }
                {!missions.includes("CloseSuction") &&
                <div className={styles.alertIconElement} onClick={() => {setShowElement('CloseSuction') ; handleMission('CloseSuction') ; setCloseSuctionAlertStep(0)}}>
                </div>                
                }   */}

            <div className={styles.alertIconElement} onClick={() => {setShowElement('CloseSuction') ; handleMission('CloseSuction') ; setCloseSuctionAlertStep(0)}}>
                </div>  
            </div>
        )
    }
    const CloseSuctionAlertBox = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={() => {closeBox ; setCloseSuctionAlertStep(0)}}>
                    X
                </div>
                {/* <div className={styles.alertText}>
                    <div className={styles.d_flex}>
                            <div>
                                <button className={styles.alertSubmitBtn2} onClick={() => {handleMission('CloseSuction') ; setCloseSuctionAlertStep(2)}}>
                                ตรวจสอบการรั่ว ventilator circuits
                                </button>
                            </div>
                            <div>
                                <button className={styles.alertSubmitBtn2} onClick={() => {handleMission('CloseSuction') ; setCloseSuctionAlertStep(2)}}>
                                เปลี่ยน ventilator circuits
                                </button>
                            </div>
                    </div>
                </div> */}
                <div className={styles.alertText}>
                <p>
                ตรวจไม่พบลมรั่วบริเวณ Close Suction
                </p>
                </div>
                <button className={styles.alertSubmitBtn} onClick={closeBox}>
                    NEXT
                </button>
            </div>
        )
    }

    const CloseSuctionAlertBox2 = () => {
        return (
            <div className={styles.alertBox}>
                <div className={styles.alertClose} onClick={closeBox}>
                    X
                </div>
                <div className={styles.alertText}>
                <p>
                ไม่มีการรั่วของ Ventilator Circuits
                </p>
                </div>
                <button className={styles.alertSubmitBtn} onClick={closeBox}>
                    NEXT
                </button>
            </div>
        )
    }


    console.log(isFinishPatient)

    // Render
    return (
        <div className={styles.room_bg_female}>
            {!isStart && <StartBox />}

            {isStart && <PatientElement />}
            {showElement=='Patient' && patientAlertStep==1 && <PatientAlertBox1 />}
            {showElement=='Patient' && patientAlertStep==2 && <PatientAlertBox2 />}
            {/* {showElement=='Patient' && patientAlertStep==2 && <PatientAlertBox3 />} */}
            {showElement=='Patient' && patientAlertStep==4 && <PatientAlertBox4 />}
            {showElement=='Patient' && patientAlertStep==5 & isFinishPatient == false && <PatientAlertBox5 />}
            {showElement=='Patient' && patientAlertStep==5 & isFinishPatient == true && <PatientAlertBox5_finish />}
            {showElement=='Patient' && patientAlertStep==6 && <PatientAlertBox6 />}
            {showElement=='Patient' && patientAlertStep==7 && <PatientAlertBox7 />}

            {/* {isStart && <VentilatorElement />}
            {showElement=='Ventilator' && <VentilatorMonitor />} */}
            

            {isStart && <CircuitsElement />}
            {showElement=='Circuits' && circuitsAlertBoxStep==0 && <CircuitsAlertBox />}
            {showElement=='Circuits' && circuitsAlertBoxStep==2 && <CircuitsAlertBox2 />}

            {/* {isStart && <CuffElement />}
            {showElement=='Cuff' && <CuffAlertBox />}
            {showElement=='Cuff2' && <CuffAlertBox2 />} */}

            {/* {isStart && <TubeElement />}
            {showElement=='Tube' && <TubeAlertBox />} */}

            {isStart && <CloseSuctionElement />}
            {showElement=='CloseSuction' && closeSuctionAlertStep==0 && <CloseSuctionAlertBox />}
            {showElement=='CloseSuction' && closeSuctionAlertStep==2 && <CloseSuctionAlertBox2 />}
        </div>        
    )
}