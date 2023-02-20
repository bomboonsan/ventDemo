import { useState, useEffect } from 'react';
import styles from './venttest.module.scss'
import Image from 'next/image'
import Link from "next/link";
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'
import Moveable from "react-moveable"; // preact-moveable
// import dynamic from 'next/dynamic'

// ทำให้กดปุ่มเพศชายได้ด้วย
// ส่วนสูงกับน้ำหนักให้หมุ่นย้อนกลับได้

// หน้า กด 3 wave ให้หน้าหลังจากที่เปลี่ยนเป็น 3 wave แล้ว  แล้ว
// ขึ้น FINISH สีเขียว แล้วกดไปที่ เมนู ที่ Leaning Mode


// 
// ถ้าติดผิก ให้แสดงหน้า HINT ของอาจารย์ว่า ลองใหม่อีกครั้ง (เหมือนในหน้าตอบคำถาม)
// 
// 

// NEXT  สุดท้าย -> ข้อความ "กด Accept all เพื่อยืนยันการตั้งค่า โปรดตรวจสอบให้แน่ใจว่าคำตอบของท่านถูกต้อง"

export default function VentTest() {
    const router = useRouter()
    const [btnSetupRecord, setBtnSetupRecord] = useState([]);
    const [varBtnSetting, setvarBtnSetting] = useState([10,300,39,10,3.0,40,40,75,50,0.0,0,5.0,25,3.0,750,'ET']);
    const [btnSetup, setBtnSetup] = useState();
    const [stepCount, setStepCount] = useState(1);
    const [isSetWeight, setIsSetWeight] = useState(0);
    const [isSetHeight, setIsSetHeight] = useState(0);
    const [focusSetting, setFocusSetting] = useState(0);
    const [isSetting, setIsSetting] = useState(0);
    const [target, setTarget] = useState();
    const [varX, setVarX] = useState();
    const [varY, setVarY] = useState();
    const [varR, setVarR] = useState(0);    
    const [preVarR, setPreVarR] = useState(0);
    const [footerText, setFooterText] = useState('ตั้งค่า ventilator ใส่ข้อมูลคนไข้เพศชาย สูง 170 ซม.');
    const [footerTextStep, setFooterTextStep] = useState(0);
    const [status, setStatus] = useState(null);
    const [frame, setFrame] = useState({
        translate: [0,0],
        rotate: 1,
        transformOrigin: "50% 50%",
    });

    const [fontSize, setFontSize] = useState(100);
    

    // Var Control
    const [weight, setWeight] = useState(50);
    const [height, setHeight] = useState(152);
    const [heightIn, setHeightIn] = useState(59.2);

    


    const [playing, setPlaying] = useState(false);
    const [loopSet, setLoopSet] = useState(true);
    const [mutedSet, setmutedSet] = useState(true);
    const reset = () => {
        console.log('Reset')
    }

    // let showBtnSetting = [10,300,39,10,3.0,40,8.0,75,50,0.0,0,5.0,25,3.0,750,'ET'];

    useEffect(() => {
        // Var for Moveable
        setTarget(document.querySelector("#traget"));
        
        // Hidden Previos : step = 0
        const btnPrevios = document.querySelector("#btnPrevios")
        btnPrevios?.classList.add(styles['hidden']);

    }, []);

    useEffect(() => {
        if(isSetWeight == 1) {
            if (varR == 0) {
                console.log('varR=0');
            } else {
                let newWeight = Number(weight)+(varR/360);
                console.log(newWeight);
                setWeight(newWeight.toFixed(1));
            }
    
        }
        if(isSetHeight == 1) {
            // if (varR == 0) {
            //     console.log('varR=0');
            // } else {
            //     let newHeight = Number(height)+(varR/360);
            //     console.log(newHeight);
            //     setHeight(newHeight.toFixed(1));
            // }
            setPreVarR(varR);
            if (varR > 0) {
                if (varR > preVarR) {
                    let newHeight = Number(height)+(varR/3600);
                    setHeight(newHeight.toFixed(5));
                    setHeightIn(newHeight*0.393700787)
                    console.log('height1 :'+height)       
                    console.log('newHeight :'+newHeight)
                } else if (varR < preVarR) {
                    let newHeight = Number(height)-(varR/3600);
                    setHeight(newHeight.toFixed(5));
                    setHeightIn(newHeight*0.393700787)
                    console.log('height2 :'+height)       
                    console.log('newHeight :'+newHeight)
                }
            } else {
                if (varR > preVarR) {
                    let newHeight = Number(height)-(varR/3600);
                    setHeight(newHeight.toFixed(5));
                    console.log('height3 :'+height)       
                    console.log('newHeight :'+newHeight)
                } else if (varR < preVarR) {
                    let newHeight = Number(height)+(varR/3600);
                    setHeight(newHeight.toFixed(5));
                    setHeightIn(newHeight*0.393700787)
                    console.log('height4 :'+height)       
                    console.log('newHeight :'+newHeight)
                }
            }

                 
            console.log('varR :'+varR)
            console.log('preVarR :'+preVarR)
        }
        if(isSetting == 1) {
            // resetRotate()
            const currentVar = varBtnSetting;
            // console.log(currentVar)
            // let newVar = Number(currentVar[focusSetting-1])+(varR/360);
            // changeVarBtnSetting(newVar.toFixed(1) , focusSetting);
            
            // setPreVarR
            // preVarR
            // varR
            setPreVarR(varR);
            // console.log('varR: '+varR)
            // console.log('preVarR: '+preVarR)
            // console.log('varR/3600 : '+varR/3600)

            if (varR > 0) {
                if (varR > preVarR) {
                    let newVar = Number(currentVar[focusSetting-1])+(varR/10000);
                    // changeVarBtnSetting(newVar.toFixed(1) , focusSetting);
                    changeVarBtnSetting(newVar , focusSetting);
                } else if (varR < preVarR) {
                    let newVar = Number(currentVar[focusSetting-1])-(varR/10000);
                    // changeVarBtnSetting(newVar.toFixed(1) , focusSetting);
                    changeVarBtnSetting(newVar , focusSetting);
                }
            } else {
                if (varR > preVarR) {
                    let newVar = Number(currentVar[focusSetting-1])-(varR/10000);
                    // changeVarBtnSetting(newVar.toFixed(1) , focusSetting);
                    changeVarBtnSetting(newVar , focusSetting);
                } else if (varR < preVarR) {
                    let newVar = Number(currentVar[focusSetting-1])+(varR/10000);
                    // changeVarBtnSetting(newVar.toFixed(1) , focusSetting);
                    changeVarBtnSetting(newVar , focusSetting);
                }
            }

        }



        
        
    }, [varR]);



    // useEffect(() => {
    //     if (height == 170) {
    //         setFooterText('ตั้งค่า ventilator mode ตามความเหมาะสมของคนไข้')
    //     } else {
    //         setFooterText('ตั้งค่า ventilator ใส่ข้อมูลคนไข้เพศชาย สูง 170 ซม.')
    //     }       
    // }, [height]);

    // ตั้งค่า Pressure Support เป็น 10 cmH2O
    // ตั้งค่า Flow trigger เป็น 3L/min 
    // ตั้งค่า % O2 เป็น 40%
    // ตั้งค่า Pmax 35 cmH2O 
    // ปรับ Esense เป็น 25%
    // PEEP 3 cmH2O
    // ปรับ P Rise เป็น 50%


    let listFooterText = [
        'ตั้งค่า ventilator ใส่ข้อมูลคนไข้เพศชาย สูง 170 ซม.',
        'ตั้งค่า ventilator mode ตามความเหมาะสมของคนไข้',
        'ตั้งค่า Flow trigger 5L/min',
        'ตั้งค่า Peep 3 cmH2O',
        'ตั้งค่าให้ pressure support 10 cmH2O',
        'คนไข้มีภาวะของ Airway resistance ปรับ rise time เป็น 25%',
        'ตั้งค่า %O2 : 40',
        'พบว่าคนไข้มีdelay cycling ปรับ Esens 50%',
        'กด Accept All เพื่อยืนยันการตั้งค่า โปรดตรวจสอบให้แน่ใจว่าคำตอบของท่านถูกต้อง'
        // 'ปรับหน้าจอให้เป็น 3 Waveform'        
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




    // FN Setup
    const handleClick = (event) => {
        event.currentTarget.classList.add(styles['btn_setting_up_active']);
        console.log(event.currentTarget);
    };

    const handleSetWeight = (event) => {
        resetSetupBtn()
        event.currentTarget.classList.add(styles['btn_setting_up_active']);
        setIsSetWeight(1)
        setIsSetHeight(0)
        resetRotate()

        setFocusSetting(0)
        setIsSetting(0)
        resetSettingBtn()
        console.log(event.currentTarget)
    };
    const handleSetHeight = (event) => {
        resetSetupBtn()
        event.currentTarget.classList.add(styles['btn_setting_up_active']);
        setIsSetHeight(1)
        setIsSetWeight(0)
        resetRotate()

        setFocusSetting(0)
        setIsSetting(0)
        resetSettingBtn()

        document.querySelector('#rightCol')?.classList.add(styles['showPanel']);
        // บังคับการแสดงผลปุ่ม setting
        const arrBtnDisableList = ['PC','VC','VC+' ,'CPAP' , 'IE Sync']
        arrBtnDisableList.forEach(function(name){
            document.querySelector(`[data-btnName='${name}']`).classList.add(styles['btn_disable']);
        })
        logicSettingGridShow()
        // จบ
    };

    const handleSetupbtn = (event) => {
        resetSetupBtn()
        setIsSetHeight(0)
        setIsSetWeight(0)
        resetRotate()
        
        setFocusSetting(0)
        setIsSetting(0)
        resetSettingBtn()

        const btnName = event.currentTarget.getAttribute('data-btnName');
        console.log(btnName);
        const btnTrID = event.currentTarget.getAttribute('data-tr');
        handleResetSetupbtn(btnTrID);
        event.currentTarget.classList.add(styles['setupCaptionActive2']);

        setBtnSetup(btnName)
        
        const btnSetupAll = document.querySelectorAll("#tableBtnsettingGroup tr td div")
        btnSetupAll.forEach(function (i) {
            i.classList.remove(styles['btn_disable']);
        });
        // START LOGIC
        if (btnName == 'Invasive') {
            const arrBtnDisableList = ['CPAP']
            arrBtnDisableList.forEach(function(name){
                document.querySelector(`[data-btnName='${name}']`).classList.add(styles['btn_disable']);
            })
        }
        if (btnName == 'SPOINT') {
            const arrBtnDisableList = ['PC','VC','VC+' ,'CPAP']
            arrBtnDisableList.forEach(function(name){
                document.querySelector(`[data-btnName='${name}']`).classList.add(styles['btn_disable']);
            })
        }
        if (btnName == 'TC') {
            const arrBtnDisableList = ['PC','VC','VC+' ,'CPAP' , 'IE Sync']
            arrBtnDisableList.forEach(function(name){
                document.querySelector(`[data-btnName='${name}']`).classList.add(styles['btn_disable']);
            })
        }
        if (btnName == 'V-Trig') {
            const arrBtnDisableList = ['PC','VC','VC+' ,'CPAP' , 'IE Sync']
            arrBtnDisableList.forEach(function(name){
                document.querySelector(`[data-btnName='${name}']`).classList.add(styles['btn_disable']);
            })
            logicSettingGridShow()
        } else {
            resetSettingGridShow()
        }
    }

    function handleResetSetupbtn(index) {
        const trIndex = Number(index)-1; // DEMO
        const trAll = document.querySelectorAll("#tableBtnsettingGroup tr");
        
        const setupBtnAll = trAll[trIndex].querySelectorAll("td div");
        setupBtnAll.forEach(function (i) {
            i.classList.remove(styles['setupCaptionActive2']);
        });
    }

    const resetRotate = () => {
        // console.log('reset');
        setVarR(0);
        setFrame(
            {
                translate: [0,0],
                rotate: 1,
            }
        )
    }

    const resetSetupBtn = () => {
        document.querySelector('#weightSetupBtn')?.classList.remove(styles['btn_setting_up_active']);
        document.querySelector('#heightSetupBtn')?.classList.remove(styles['btn_setting_up_active']);
    }


    
    // TAble 2 setupBtn

    function logicSettingGridShow() {        
        let btnSettingGridAll =  document.querySelectorAll('#tableBtnsettingGrid td > div');
        btnSettingGridAll.forEach(function(i){
            i.classList.add(styles['invisible']);
        })
        const arrItemShow = [4,5,6,7,9,13,14];
        arrItemShow.forEach(function(i){
            btnSettingGridAll[i-1].classList.remove(styles['invisible']);
        })
    }
    function resetSettingGridShow() {
        let btnSettingGridAll =  document.querySelectorAll('#tableBtnsettingGrid td > div');
        btnSettingGridAll.forEach(function(i){
            i.classList.remove(styles['invisible']);
        })
    }

    const handleSettingbtn = (event) => {
        resetSetupBtn()
        setIsSetHeight(0)
        setIsSetWeight(0)
        resetRotate()
        resetSettingBtn()

        const btnID = event.currentTarget.getAttribute('data-settingid');
        // const btnName = event.currentTarget.getAttribute('data-btnName');
        // console.log(btnName);
        event.currentTarget.classList.add(styles['btn_setting_up_active']);

        setFocusSetting(btnID)
        setIsSetting(1)
        scrollChange(btnID)
        
    }
    const handleInputChange = (event) => {
        const btnID = event.currentTarget.getAttribute('data-settingid');
        // changeVarBtnSetting(newVar.toFixed(1) , focusSetting);
        const valueSetting = event.target.value;
        changeVarBtnSetting(valueSetting , focusSetting);
    }
    const resetSettingBtn = () => {
        const settingBtnAll = document.querySelectorAll('#tableBtnsettingGrid td > div')
        settingBtnAll.forEach( function(i) {
            i.classList.remove(styles['btn_setting_up_active']);
        } )
    }
    
    const handleSettingbtnWheel = (event) => {
        const valueSetting = event.target.value;
        console.log(valueSetting)
    }

    function scrollChange(btnID) {
        // let currentVar = varBtnSetting;
        let btnIDtest = btnID

        
        // const btnElement = document.querySelector(`[data-settingid='${btnID}']`);
        // const inputElement = btnElement.querySelector('input');

        const ventContainer = document.querySelector('#ventContainer');
        // console.log(inputElement)
        // const valueSetting = event.target.value;
        ventContainer.addEventListener('wheel', (event) => {
            let currentVar = varBtnSetting;
            if (event.deltaY > 0) {
                // Scrolling up, increment the number
                let newVar = Number(currentVar[btnIDtest-1]);
                newVar = newVar+0.5;
                // console.log('newVar'+newVar)
                // console.log('focusSetting'+btnIDtest)
                changeVarBtnSetting(newVar.toFixed(1) , btnIDtest);
            } else {
                // Scrolling down, decrement the number
                let newVar = Number(currentVar[btnIDtest-1]);
                newVar = newVar-0.5;
                // console.log('newVar'+newVar)
                changeVarBtnSetting(newVar.toFixed(1) , btnIDtest);
            }
        });
        // changeVarBtnSetting(valueSetting , focusSetting);
    }

    function changeVarBtnSetting(newVar,indexToChange) {
        // varBtnSetting
        // setvarBtnSetting
        const arrNewVar = [];
        varBtnSetting.forEach(function(i,index) {
            if (index == indexToChange-1) {
                arrNewVar.push(newVar)
            } else {
                arrNewVar.push(i)
            }
        })
        setvarBtnSetting(arrNewVar)
    }
    

    // checkAns
    const checkAns = () => {
        // ตั้งค่า Pressure Support เป็น 10 cmH2O
        // ตั้งค่า Flow trigger เป็น 3L/min 
        // ตั้งค่า % O2 เป็น 40%
        // ตั้งค่า Pmax 35 cmH2O 
        // ปรับ Esense เป็น 25%
        // PEEP 3 cmH2O
        // ปรับ P Rise เป็น 50%

        // arrItemShow = [4,5,6,7,9,13,14];
        // varBtnSetting
        if ( Number(varBtnSetting[3]).toFixed(0) == 10 && Number(varBtnSetting[4]).toFixed(0) == 3 && Number(varBtnSetting[5]).toFixed(0) == 40 & Number(varBtnSetting[6]).toFixed(0) == 35 & Number(varBtnSetting[8]).toFixed(0) == 25 & Number(varBtnSetting[12]).toFixed(0) == 50 & Number(varBtnSetting[13]).toFixed(0) == 3 ) {
            console.log('succecfully')
            setPlaying(true)
            document.querySelector('#main')?.classList.add(styles['hidden_force']);
            document.querySelector('#video')?.classList.add(styles['showVideo']);
            // router.push('/vent/finish')
            setFooterText('ปรับหน้าจอให้เป็น 3 Waveform')
            document.querySelector('#btnGroup')?.classList.add(styles['hidden']);
            // btnGroup
            
        } else {
            console.log('fail')
            router.push('/hint/vent-false')
        }
    }

    const showSwitchPanel = () => {
        document.querySelector('#switchWaveFormPanel')?.classList.toggle(styles['showPanel']);
    }
    const closeWaveFormPanel = () => {
        document.querySelector('#switchWaveFormPanel')?.classList.remove(styles['showPanel']);
    }

    const twoWave = '../video/2wave.mp4'
    const threeWave = '../video/3wave.mp4'
    const [waveVideo, setWaveVideo] = useState(twoWave);
    const showTwoWave = () => {
        setWaveVideo('../video/2wave.mp4')
    }
    const showThreeWave = () => {
        setWaveVideo('../video/3wave.mp4')
        document.querySelector('#btnGroup')?.classList.add(styles['hidden']);

        document.querySelector('#introductionBox')?.classList.add(styles['hidden']);
        document.querySelector('#finishBtn')?.classList.add(styles['finishShow']);

    //     setTimeout(function(){
    //         router.push('/vent/finish')

    // ซ่อนกล่องข้อความ แล้วใส่ปุ่ม FINISH 


    //    }, 2000);
    }

    const genderFemale = () => {
        document.querySelector('#genderMale')?.classList.remove(styles['genderBoxActive']);
        document.querySelector('#genderFemale')?.classList.add(styles['genderBoxActive']);

        document.querySelector('#rightCol')?.classList.add(styles['showPanel']);

        // บังคับการแสดงผลปุ่ม setting
        const arrBtnDisableList = ['PC','VC','VC+' ,'CPAP' , 'IE Sync']
        arrBtnDisableList.forEach(function(name){
            document.querySelector(`[data-btnName='${name}']`).classList.add(styles['btn_disable']);
        })
        logicSettingGridShow()
        // จบ
    }
    const genderMale = () => {
        document.querySelector('#genderMale')?.classList.add(styles['genderBoxActive']);
        document.querySelector('#genderFemale')?.classList.remove(styles['genderBoxActive']);


        document.querySelector('#rightCol')?.classList.add(styles['showPanel']);
        // บังคับการแสดงผลปุ่ม setting
        const arrBtnDisableList = ['PC','VC','VC+' ,'CPAP' , 'IE Sync']
        arrBtnDisableList.forEach(function(name){
            document.querySelector(`[data-btnName='${name}']`).classList.add(styles['btn_disable']);
        })
        logicSettingGridShow()
        // จบ


    }

    
    return (           
        <>
        <section id='ventContainer' className={styles.vent_container}>
            <header className={styles.panel_top}>
                <div className={styles.panel_top_content}>
                    <h2>New Patient Setup</h2>
                    <h3>Vent startup in progress</h3>
                </div>
                <div className={styles.font_control}>
                    <div className={styles.font_control_wrap}>
                        <button onClick={() => setFontSize(fontSize - 3)}>
                            -
                        </button>
                        <button onClick={() => setFontSize(fontSize + 3)}>
                            +
                        </button>
                    </div>
                </div>
            </header>
            <main id='main' className={styles.main} style={{
                fontSize: `${fontSize}%`
            }}>
                <div className={styles.VentSetup}>
                    <section className={styles.sidebar}>
                        <div className={styles.sideLogo}>
                            <p>
                                Setup
                            </p>
                        </div>
                        <div className={styles.sideList}>
                            <ul>
                                <li className={styles.active}>
                                    <span>Vent</span>
                                </li>
                                <li>
                                    <span>Apnea</span>
                                </li>
                                <li>
                                    <span>Alarms</span>
                                </li>
                                <li>
                                    <span>More <br/> Settings</span>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.kgbox}>
                            <div className={styles.kg}>
                                <span className={styles.spnkg}>
                                    {weight}
                                </span>
                                <span className={styles.spnkgc}>
                                    kg
                                </span>
                            </div>
                            <div className={styles.mlkg}>
                                <span className={styles.spnmlkg}>
                                    6.00
                                </span>
                                <span className={styles.spnlmkgc}>
                                    mL/kg
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className={styles.Ventcontent}>
                        <div className={styles.settings_box}>
                            <div className={styles.leftCol}>
                                <h4>
                                    Setup Vent
                                </h4>
                                <div className={styles.helpText}>
                                    <span>Enter predicted body weight</span>
                                </div>
                                <div className={styles.weightBox}>
                                    <div id="weightSetupBtn" className={styles.btn_setting_up} onClick={event => handleSetWeight(event)}>
                                        <div className={styles.btnsLineMid}>{weight}</div>
                                        <div className={styles.btnsLineTop}>kg</div>
                                        <div className={styles.btnsLineBot}>(110lb)</div>
                                    </div>
                                </div>
                                <div className={styles.orBox}>
                                    <span>— OR —</span>
                                </div>
                                <div className={styles.helpText}>
                                    <span>gender and height</span>
                                </div>
                                <div className={styles.genderBox}>
                                    <div id='genderMale' className={styles.genderbtn} onClick={genderMale}>
                                        <Image
                                            src="/vent/button-gender-male.png"
                                            alt="button-gender-male"
                                            // layout="fill"
                                            // objectFit="cover"
                                            width={196}
                                            height={196}
                                        />
                                    </div>
                                    <div id='genderFemale' className={styles.genderbtn} onClick={genderFemale}>
                                    <Image
                                            src="/vent/button-gender-female.png"
                                            alt="button-gender-female"
                                            // layout="fill"
                                            // objectFit="cover"
                                            width={196}
                                            height={196}
                                        />
                                    </div>
                                </div>
                                <div className={styles.heightBox}>
                                    <div id="heightSetupBtn" className={styles.btn_setting_up} onClick={event => handleSetHeight(event)}>
                                        {/* <div className={styles.btnsLineMid}>
                                        {height} 
                                        </div> */}
                                        <input type='text' class={styles.inputSetting} value={Number(height).toFixed(0)} onChange={event => setHeight(event.target.value)} />    
                                        <div className={styles.btnsLineTop}>cm</div>
                                        <div className={styles.btnsLineBot}>({Number(heightIn).toFixed(1)}in)</div>
                                    </div>
                                </div>
                            </div>
                            <div id='rightCol' className={styles.rightCol}>
                                <table id='tableBtnsettingGroup' className={styles.table_btngroup} width="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Ventilation Type</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='Invasive' data-tr='1' className={styles.setupbtn_active}>
                                                    <span>Invasive</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='NIV' data-tr='1' className={styles.setupbtn}>
                                                    <span>NIV</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='HFO' data-tr='1' className={styles.setupbtn}>
                                                    <span>HFO<sub>2</sub>T</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Mode</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='A/C' data-tr='2' className={styles.setupbtn}>
                                                    <span>A/C</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='SIMV' data-tr='2' className={styles.setupbtn}>
                                                    <span>SIMV</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='SPOINT' data-tr='2' className={styles.setupbtn_active}>
                                                    <span>SPOINT</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='BiLevel' data-tr='2' className={styles.setupbtn}>
                                                    <span>BiLevel</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='CPAP' data-tr='2' className={styles.setupbtn_disable}>
                                                    <span>CPAP</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Mandatory Type</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='PC' data-tr='3' className={styles.setupbtn_disable}>
                                                    <span>PC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='VC' data-tr='3' className={styles.setupbtn_disable}>
                                                    <span>VC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='VC+' data-tr='3' className={styles.setupbtn_disable}>
                                                    <span>VC+</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Spontaneous Type</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='PS' data-tr='4' className={styles.setupbtn_active}>
                                                    <span>PS</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='TC' data-tr='4' className={styles.setupbtn}>
                                                    <span>TC</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='VS' data-tr='4' className={styles.setupbtn}>
                                                    <span>VS</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='PAV+' data-tr='4' className={styles.setupbtn}>
                                                    <span>PAV+</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.td_title}>
                                                <div className={styles.setupCaption}>
                                                    <span>Trigger Type</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='P-Trig' data-tr='5' className={styles.setupbtn}>
                                                    <span>P-Trig</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='V-Trig' data-tr='5' className={styles.setupbtn_active}>
                                                    <span>V-Trig</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-btnName='IE Sync' data-tr='5' className={styles.setupbtn}>
                                                    <span>IE Sync</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table id='tableBtnsettingGrid' className={styles.table_btnsetting} width="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr>
                                            <td>
                                                <div data-settingid='1' className={styles.btn_setting} onClick={handleSettingbtn} onWheel={handleSettingbtnWheel}>
                                                    <div className={styles.btnsLineTop}>
                                                        f
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                        {varBtnSetting[0]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[0]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        1/min
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='2' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>T</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                        {varBtnSetting[1]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[1]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        mL
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='3' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>MAX</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                        {varBtnSetting[2]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[2]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='4' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>SUPP</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                        {varBtnSetting[3]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[3]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='5' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        V <sub>SENS</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                        {varBtnSetting[4]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[4]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='6' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        O<sub>2</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[5]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[5]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='7' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        P<sub>PEAK</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[6]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[6]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='8' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        D<sub>SENS</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[7]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[7]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        L/min
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                            <td>
                                                <div data-settingid='9' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[8]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[8]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='10' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        T<sub>PL</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[9]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[9]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='11' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        Ramp
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[10]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[10]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                    &nbsp;
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='12' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        l SPONT
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[11]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[11]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        S
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='13' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        E<sub>SENS</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[12]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[12]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        %
                                                    </div>
                                                </div>
                                            </td>                                            
                                            <td>
                                                <div data-settingid='14' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        PEEP
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[13]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[13]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        cmH<sub>2</sub>O
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='15' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        V<sub>Tl</sub>
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[14]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[14]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        mL
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div data-settingid='16' className={styles.btn_setting} onClick={handleSettingbtn}>
                                                    <div className={styles.btnsLineTop}>
                                                        Tube
                                                    </div>
                                                    {/* <div className={styles.btnsLineMid}>
                                                    {varBtnSetting[15]}
                                                    </div> */}
                                                    <input type='text' class={styles.inputSetting} value={Number(varBtnSetting[15]).toFixed(0)} onChange={handleInputChange} />    
                                                    <div className={styles.btnsLineBot}>
                                                        Type
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        
                                    </tbody>
                                </table>
                                <div className={styles.btn_group_area}>
                                    <div className={styles.btn_group}>
                                        <button className={styles.btnAccept} onClick={checkAns}>
                                            Accept All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <div id='video' className={styles.videoContainer}>
                <ReactPlayer 
                // className={styles.video_item} 
                url={waveVideo}  
                playing={playing} 
                onEnded={reset}
                muted={mutedSet}
                loop={loopSet}
                width='100%'
                height='100%'
                />
                <div className={styles.switchWaveFormToggle} onClick={showSwitchPanel}></div>
                <div id='switchWaveFormPanel' className={styles.switchWaveFormPanel}>
                <Image                
                    src="/images/switchWaveForm.png"
                    alt="switchWaveForm"
                    // layout="fill"
                    // objectFit="cover"
                    width={2024}
                    height={1138}
                />   
                <div className={styles.btnTwoWave} onClick={showTwoWave}></div>
                <div className={styles.btnThreeWave} onClick={showThreeWave}></div>
                <div className={styles.closeWaveFormPanel} onClick={closeWaveFormPanel}></div>
                </div>
            </div>
            <div className={styles.statBar}>
                {/* <div className={styles.log_box}>
                    {varR} degree
                </div> */}
            </div>
            <div className={styles.footer}>
                <div id='introductionBox' className={styles.introduction_box}>
                    <p>
                        {footerText}
                    </p>
                    <div id='btnGroup' className={styles.btnGroup}>
                        <button id='btnPrevios' className={styles.btnItem} onClick={previosText}>
                            PREVIOUS 
                        </button>
                        <button id='btnNext' className={styles.btnItem} onClick={nextText}>
                            NEXT
                        </button>
                    </div>
                </div>
                <div id='finishBtn' className={styles.finishBtnContainer}>
                    <Link href='/menulearningmode'>
                    <button className={styles.btnItem}>
                        FINISH
                    </button>
                    </Link>
                </div>
            </div>            
            <footer id='footer_controlPanel' className={styles.controlpanel_wrap}>
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
                    <div id="traget" className={styles.controlpanel_knob_box}>
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
            <Moveable
                target={target}
                originDraggable={true}
                originRelative={true}
                draggable={false}
                throttleDrag={0}
                startDragRotate={0}
                throttleDragRotate={0}
                zoom={1}
                // origin={true}
                origin={false}
                padding={{"left":0,"top":0,"right":0,"bottom":0}}
                rotatable={true}
                pinchable={true}
                scalable={false}
                throttleRotate={0}
                rotationPosition={"top"}
                onDragOriginStart={e => {
                    e.dragStart && e.dragStart.set(frame.translate);
                }}
                onDragOrigin={e => {
                    frame.translate = e.drag.beforeTranslate;
                    frame.transformOrigin = e.transformOrigin;
                }}
                onDragStart={e => {
                    e.set(frame.translate);
                }}
                onDrag={e => {
                    frame.translate = e.beforeTranslate;
                }}
                onRotateStart={e => {
                    e.set(frame.rotate);
                }}
                onRotate={e => {
                    frame.rotate = e.beforeRotate;
                }}
                onRender={e => {
                    const { translate, rotate, transformOrigin } = frame;
                    e.target.style.transformOrigin = transformOrigin;
                    e.target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`
                        +  ` rotate(${rotate}deg)`;
                    // console.log(e.target.style.transform);
                    setVarX(translate[0])
                    setVarY(translate[1])
                    setVarR(rotate)
                }}
            />
        </section>    
        </> 
    )
}